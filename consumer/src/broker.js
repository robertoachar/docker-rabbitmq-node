const amqp = require('amqplib');
const winston = require('winston');

module.exports.start = async () => {
  winston.info('Starting broker...');

  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);
  winston.info('Broker connected!');

  const channel = await connection.createChannel();
  winston.info('Channel opened!');

  await channel.assertQueue('tasks', { durable: true });
  winston.info('Queue asserted!');

  await channel.prefetch(1);
  winston.info('Prefetch defined!');

  winston.info('Waiting tasks...');

  channel.consume('tasks', (message) => {
    const content = message.content.toString();
    const task = JSON.parse(content);

    winston.info(`${task.message} received!`);

    channel.ack(message);
    winston.info('Message ACK!');
  });
};
