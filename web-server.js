const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const webServerConfig = require('./config');

const goalActions = require('./app/controllers/goal-actions-controller');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();

    let allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

      if ('OPTIONS' == req.method) {
        res.send(200);
      }
      else {
        next();
      }
    };
    app.use(allowCrossDomain);
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    httpServer = http.createServer(app);

    app.post('/goals/action', async (req, res) => {
      await goalActions.post(req, res);
      res.sendStatus(200);
    });

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server is listening to the port: ${webServerConfig.port}`);
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

module.exports = {
  initialize, close
}