import {Router} from 'express';
import {readFile} from 'fs';
import {Config} from '../config/';
import Logger from '../config/logger';

let TicketRouter = Router();

TicketRouter.get('/', (req, res) => {
  readFile(Config.TicketDataFile, 'utf-8', (err, data) => {
    if (err) {
      Logger.error(err)
    }
    res.send(JSON.parse(data));
  });
});

export default TicketRouter;