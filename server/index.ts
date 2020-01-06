import * as express from "express";
import {Config} from './config';
import MainRouter from './routers';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as Twilio from 'twilio';

function startInstance() {
  const twilio = Twilio(Config.TwilioSID, Config.TwilioAuthToken);
  const notifyService = twilio.notify.services(Config.TwilioNotifySID);
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

  app.post('/api/sms', (req, res) => {
    res.header('Content-Type', 'application/json');

    notifyService.notifications
      .create({
        toBinding: req.body.bindings,
        body: req.body.message
      })
      .then(notification => {
        res.send(JSON.stringify({ success: true, notification: notification }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  });

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })

  app.listen(Config.Port, () => {
    console.log(`Server is running on Port: ${Config.Port}`)
  })
}

startInstance();