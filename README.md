# docker-rabbitmq-node

[![License][license-badge]][license-url]

> A playground for Docker with RabbitMQ and Node.

# Development

* Cloning the repo

```bash
$ git clone https://github.com/robertoachar/docker-rabbitmq-node.git
```

* Installing dependencies

```bash
$ npm install
```

# Docker

* Building an image

```bash
$ docker-compose build
```

* Running containers

```bash
$ docker-compose up
```

* Running containers with scale (round-robin)

```bash
$ docker-compose up --scale consumer=3
```

* Stopping containers

```bash
$ docker-compose down
```

# Author

[Roberto Achar](https://twitter.com/robertoachar)

# License

[MIT](https://github.com/robertoachar/docker-rabbitmq-node/blob/master/LICENSE)

[license-badge]: https://img.shields.io/github/license/robertoachar/docker-rabbitmq-node.svg
[license-url]: https://opensource.org/licenses/MIT
