import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const apiToken = req.headers['api-token']
    if (!apiToken) {
      res.status(401).send('Unauthorized')
      return
    }
    next()
  }
}
