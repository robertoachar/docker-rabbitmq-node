FROM node:latest

LABEL maintainer="robertoachar@gmail.com"

WORKDIR /usr/src/app

VOLUME [ "/usr/src/app" ]

RUN npm install -g nodemon

CMD [ "nodemon", "-L", "src/index.js" ]
