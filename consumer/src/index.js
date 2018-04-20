const winston = require('winston');

const broker = require('./broker');

broker.start().catch((err) => {
  winston.error(err);
});
