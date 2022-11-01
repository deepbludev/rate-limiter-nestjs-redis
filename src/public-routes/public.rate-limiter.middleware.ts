import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { RateLimiterService } from '../rate-limiter/rate-limiter.service'
import { publicRoutes } from './public.routes'

@Injectable()
export class PublicRateLimiterMiddleware implements NestMiddleware {
  constructor(private readonly rateLimiterService: RateLimiterService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.ip
    const path = req.url.slice(1)
    const { weight } = publicRoutes[path].rateLimit

    await this.rateLimiterService.checkUsage(token, { weight })
    next()
  }
}
