import express, { Request, Response } from 'express'
import { HttpCode } from '../constants'

const router = express.Router()

const prefix = '/api/v1'
router.get(`${prefix}/`, (_req: Request, res: Response) => {
  res.status(HttpCode.Forbidden).json({ message: 'Hello world' })
})

export default router
