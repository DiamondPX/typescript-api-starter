import { createLogger, format, transports } from 'winston'
import fs from 'fs'
import path from 'path'

const env = process.env['NODE_ENV'] || 'development'
const logDir = 'log'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const filename = path.join(logDir, 'logger.log')

const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
    }),
    new transports.File({ filename }),
  ],
})

export default logger
