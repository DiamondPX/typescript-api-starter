import dotenv from 'dotenv'
dotenv.config()
import express, { Application, Request, Response, json, NextFunction } from 'express'
import cors from 'cors'
import path from 'path'
import { createStream } from 'rotating-file-stream'
import moment from 'moment-timezone'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/error'
import routers from './routes'
import { HttpCode } from './constants'
import bodyParser from 'body-parser'

const app: Application = express()
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
)

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 1000000,
    extended: true,
  }),
)

app.use(
  cors({
    origin: process.env['CORS'] || '*',
    methods: 'GET,PUT,POST,DELETE',
  }),
)

const accessLogStream = createStream('access.log', {
  interval: '7d', // rotate daily
  path: path.join('log'),
})

morgan.token('date', (_req: Request, _res: Response, tz: any) => {
  return moment().tz(tz).format('DD-MM-YYYY HH:mm:ss')
})

app.use(morgan('[:date[Asia/Bangkok]] | :method | :status | :url | :response-time ms | :res[content-length]', { stream: accessLogStream }))
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
  next()
})
app.use(json())
app.disable('x-powered-by')
app.get('/', (_req: Request, res: Response) => {
  res.status(HttpCode.Forbidden).json({ message: 'Forbidden' })
})

app.use(routers)
app.use(notFound)
app.use(errorHandler)

export default app
