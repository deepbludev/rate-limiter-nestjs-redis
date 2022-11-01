import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { RateLimiterService } from '../rate-limiter/rate-limiter.service'
import { privateRoutes } from './private.routes'

@Injectable()
export class PrivateRateLimiterMiddleware implements NestMiddleware {
  constructor(private readonly rateLimiterService: RateLimiterService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-api-key']?.toString()
    console.log({ token })
    const path = req.url.slice(1)
    const { weight } = privateRoutes[path].rateLimit

    await this.rateLimiterService.checkUsage(token, { weight })
    next()
  }
}
