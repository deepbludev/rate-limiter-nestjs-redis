import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RateLimiterService } from '../rate-limiter/rate-limiter.service'
import { RateLimitExceededError } from '../rate-limiter/rate-limit-exceeded.error'
import { publicRoutes } from './public.routes'

@Injectable()
export class PublicRateLimiterMiddleware implements NestMiddleware {
  constructor(
    private readonly rateLimiterService: RateLimiterService,
    private configService: ConfigService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.ip

    const { isOverLimit, untilReset } =
      await this.rateLimiterService.checkUsage(token, {
        limit: this.configService.get<number>('rateLimit.ip'),
        weight: publicRoutes[req.url.slice(1)].rateLimit,
      })

    if (isOverLimit) throw new RateLimitExceededError(untilReset)
    next()
  }
}
