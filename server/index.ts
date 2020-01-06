import * as express from "express";
import {Config} from './config';
import MainRouter from './routers';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as sendgrid from '@sendgrid/mail';
import * as Twilio from 'twilio';

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

  // twilio
  const twilio = Twilio(Config.TwilioSID, Config.TwilioAuthToken);
  const notifyService = twilio.notify.services(Config.TwilioNotifySID);
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

  // sendgrid
  sendgrid.setApiKey(Config.SendgridAPIKey);
  app.post('/api/email', (req, res) => {
    res.header('Content-Type', 'application/json');
    const msg = {
      to: req.body.emails,
      from: 'do-not-reply-decaf@tesc.ucsd.edu',
      subject: 'Decaf Ticket Notification',
      text: req.body.message
    };
    sendgrid.sendMultiple(msg)
      .then(email => {
        res.send(JSON.stringify({ success: true, email: email }));
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