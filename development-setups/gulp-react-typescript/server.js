"use strict";
const express = require('express');
const app = express();
const config = require('./config.json');
const path = require('path');

app.use(express.static(__dirname + '/public/'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname,  config.html.out, 'index.html')));

// app.get('/api', (req, res) => res.json({ message: 'helloworld' }));

app.listen(config.server.port, () => console.log(`Express Server listen at port ${config.server.port}...`));