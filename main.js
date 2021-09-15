#!/usr/bin/env node

// # dev 
// ./main.js --datadir ./demo --port 8114
// npx webpack serve --config ./config/webpack.config.dev.js --port 3016

const commander = require('commander');
const program = new commander.Command();

program
  .option('-p, --port-http <port>', 'specify port number for http server', 8114 )
  .option('-d, --datadir <path>', 'specify data directory', '../')
  .parse(process.argv)
  ;
  // if (! process.argv.slice(2).length) program.help() ;

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const moment = require('moment');

app.use(cors());
app.use(express.static(path.join(__dirname, program.datadir)));

app.get('/', async function (req, res) {
  res.redirect('/scrapbook');
});

app.listen(program.portHttp);

if (! program.hideLog) console.log(moment().format(), "server started...");

