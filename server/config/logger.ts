import { createLogger, format, transports } from 'winston';

import { Config } from '.';

export default createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({stack: true}),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({filename: 'error.log', level: 'info'}),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({stack: Config.NodeEnv !== 'development'}),
        format.splat(),
        format.simple()
      ),
      handleExceptions: true,
    }),
  ],
});