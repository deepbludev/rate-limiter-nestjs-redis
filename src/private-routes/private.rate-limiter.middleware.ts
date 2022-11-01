import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { RateLimiterService } from '../rate-limiter/rate-limiter.service'

@Injectable()
export class PrivateRateLimiterMiddleware implements NestMiddleware {
  constructor(private readonly rateLimiterService: RateLimiterService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiToken = req.headers['api-token']
    await this.rateLimiterService.checkUsage(apiToken as string, { weight: 2 })
    next()
  }
}
