const amqp = require('amqplib');
const winston = require('winston');

const delay = require('./delay');

module.exports.start = async () => {
  winston.info('Starting broker...');

  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);
  winston.info('Broker connected!');

  const channel = await connection.createChannel();
  winston.info('Channel opened!');

  await channel.assertQueue('tasks', { durable: true });
  winston.info('Queue asserted!');

  let i = 1;
  while (i <= 3) {
    const task = { message: `Task ${i}` };

    await delay(1000);

    await channel.sendToQueue('tasks', new Buffer(JSON.stringify(task)), {
      contentType: 'application/json',
      persistent: true
    });

    winston.info(`Task ${i} sent!`);

    i++;
  }

  setTimeout(() => {
    connection.close();
  }, 3000);
};
