import * as express from "express";
import {Config} from './config';
import MainRouter from './routers';
import {startPoller} from './poller';
import * as bodyParser from 'body-parser';
import * as path from 'path';

function startInstance() {
  const app = express();

  app.use(bodyParser.json({type: 'application/json', limit: '50mb'}));

  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 3000
  }));

  app.use('/static', express.static(path.join(__dirname, '../build/static')));
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.use('/api', MainRouter);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })

  startPoller();

  app.listen(Config.Port, () => {
    console.log(`Server is running on Port: ${Config.Port}`)
  })
}

startInstance();