const amqp = require('amqplib');
const winston = require('winston');

module.exports.start = async () => {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);

  const channel = await connection.createChannel();
  await channel.assertQueue('tasks', { durable: true });

  for (let i = 1; i <= 10; i++) {
    const task = { message: `Task ${i}` };

    await channel.sendToQueue('tasks', new Buffer(JSON.stringify(task)), {
      contentType: 'application/json',
      persistent: true
    });

    winston.info(`Task ${i} sent!`);
  }

  setTimeout(() => {
    connection.close();
  }, 3000);
};
