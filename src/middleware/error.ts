import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
// import { HttpCode } from '../constants'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
  next(error)
}

export const errorHandler: ErrorRequestHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  // res.status(statusCode)
  res.status(statusCode).json({
    message: err.message,
    stack: process.env['NODE_ENV'] === 'production' ? '🥞' : err.stack,
  })
  next()
}
