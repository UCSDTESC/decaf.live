import { config } from 'dotenv';
import * as path from 'path';

config({path: path.join(__dirname, '../../.env')});

const NodeEnv = process.env.NODE_ENV || 'development';

export const Config = {
  Port: Number(process.env.PORT) || 5000,
  NodeEnv,
  IsDev: NodeEnv === 'development',
  IsProd: NodeEnv === 'production',
  MongoURI: String(process.env.MONGO_URI),
  AirtableKey: String(process.env.AIRTABLE_KEY),
  AirtableBase: String(process.env.AIRTABLE_BASE),
  TicketDataFile: path.join(__dirname, '../data/ticket.json')
}