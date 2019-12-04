import { config } from 'dotenv';

config();

const NodeEnv = process.env.NODE_ENV || 'development';

export const Config = {
  Port: Number(process.env.PORT) || 5000,
  NodeEnv,
  IsDev: NodeEnv === 'development',
  IsProd: NodeEnv === 'production'
}