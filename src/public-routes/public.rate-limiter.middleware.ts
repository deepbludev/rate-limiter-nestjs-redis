import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { RateLimiterService } from '../rate-limiter/rate-limiter.service'

@Injectable()
export class PublicRateLimiterMiddleware implements NestMiddleware {
  constructor(private readonly rateLimiterService: RateLimiterService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    await this.rateLimiterService.checkUsage(req.ip, { weight: 1 })
    next()
  }
}
