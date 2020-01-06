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
  TwilioSID: String(process.env.REACT_APP_TWILIO_ACCOUNT_SID),
  TwilioAuthToken: String(process.env.REACT_APP_TWILIO_AUTH_TOKEN),
  TwilioNotifySID: String(process.env.REACT_APP_TWILIO_SERVICE_SID)
}