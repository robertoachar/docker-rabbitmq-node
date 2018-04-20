const amqp = require('amqplib');
const winston = require('winston');

module.exports.start = async () => {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);

  const channel = await connection.createChannel();
  await channel.assertQueue('tasks', { durable: true });

  Array(10)
    .fill()
    .map(async (i) => {
      const task = { message: `Task ${i}` };

      await channel.sendToQueue('tasks', Buffer.from(JSON.stringify(task)), {
        contentType: 'application/json',
        persistent: true
      });

      winston.info(`Task ${i} sent!`);
    });

  setTimeout(() => {
    connection.close();
  }, 3000);
};
