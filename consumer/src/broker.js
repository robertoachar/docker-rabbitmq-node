const amqp = require('amqplib');
const winston = require('winston');

const delay = require('./delay');

module.exports.start = async () => {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);

  const channel = await connection.createChannel();

  /**
   * Use queue
   */
  // const queue = 'tasks';
  // channel.assertQueue(queue, { durable: true });

  /**
   * Use exchange
   */
  const exchange = 'logs';
  channel.assertExchange(exchange, 'fanout', { durable: false });
  const { queue } = await channel.assertQueue('', { exclusive: true });
  channel.bindQueue(queue, exchange, '');

  await channel.prefetch(1);

  winston.info('Waiting tasks...');

  channel.consume(queue, async (message) => {
    await delay(100);

    const task = JSON.parse(message.content.toString());

    channel.ack(message);

    winston.info(`${task.message} received!`);
  });
};
