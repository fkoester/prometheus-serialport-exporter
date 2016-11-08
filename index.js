#! /bin/env

const client = require('prom-client');
const express = require('express');
const sensors = require('./sensors');

const server = express();

server.get('/metrics', function(req, res) {
	res.end(client.register.metrics());
});

server.listen(3000);
