import Bottleneck from 'bottleneck';
import * as Airtable from 'airtable';
import { Config } from '../config';
import Logger from '../config/logger';
import * as fs from 'fs';

if (!Config.AirtableKey) {
  throw Error('poller: Airtable Key not set')
}

if (!Config.AirtableBase) {
  throw Error('poller: Airtable Base not set')
}

const TIME_LIMIT = 3000;
const base = new Airtable({ apiKey: Config.AirtableKey })
                .base(Config.AirtableBase)


Logger.info("Running Poller...");

const cache = {ticketNum: undefined}

const getCurrentTicket =  () => {
    return base('Current Ticket')
            .select()
            .all()
}

//4 requests per second
const limiter = new Bottleneck({
    minTime: TIME_LIMIT,
    maxConcurrent: 1
});

export function startPoller() {
  setInterval(
    () => {
      limiter.schedule(() => getCurrentTicket())
        .then((res) => {
            let data = res[0].fields
            let ticketNum = (data as any).ticketNum;

            if (cache.ticketNum != ticketNum) {
              try {
                Logger.info(`poller: Polled & wrote ticket number: ${ticketNum}`)
                fs.writeFileSync(Config.TicketDataFile, JSON.stringify(data))
                cache.ticketNum = ticketNum
              } catch(e) {
                Logger.error('poller: Caught error in writing polled data')
              }
            } else {
              Logger.info(`poller: Received cached data on poll: ${ticketNum}`)
            } 
        })
        .catch(e => {
            console.error(e)
        })} 
    , TIME_LIMIT);
}

