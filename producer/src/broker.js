const amqp = require('amqplib');
const winston = require('winston');

module.exports.start = async () => {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);

  const channel = await connection.createChannel();

  /**
   * Use exchange for pub/sub
   */
  const ex = 'logs';
  await channel.assertExchange(ex, 'fanout', { durable: false });

  /**
   * Use Queue for message bus
   */
  // await channel.assertQueue('tasks', { durable: true });

  Array(200)
    .fill()
    .map(async (x, y) => {
      const task = { message: `Task ${y}` };

      /**
       * Use exchange for pub/sub
       */
      await channel.publish(ex, '', Buffer.from(JSON.stringify(task)), {
        contentType: 'application/json',
        persistent: true
      });

      /**
       * Use Queue for message bus
       */
      // await channel.sendToQueue('tasks', Buffer.from(JSON.stringify(task)), {
      //   contentType: 'application/json',
      //   persistent: true
      // });

      winston.info(`Task ${y} sent!`);
    });

  setTimeout(() => {
    connection.close();
  }, 3000);
};
