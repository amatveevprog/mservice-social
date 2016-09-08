#!/usr/bin/env node

const dir = '../src';

// accepts conf through .env file
// suitable for configuring this in the docker env
const configuration = require('ms-conf');
const Chat = require(dir);
const chat = new Chat(configuration.get('/'));

chat.connect()
  .then(() => {
    const address = chat.http.info;
    chat.log.info(`connected on ${address.address}:${address.port}`);
  })
  .catch(err => {
    chat.log.fatal('Failed to start service', err);
    setImmediate(() => {
      throw err;
    });
  });