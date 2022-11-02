import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RateLimiterService } from '../rate-limiter/rate-limiter.service'
import { RateLimitExceededError } from '../rate-limiter/rate-limit-exceeded.error'
import { privateRoutes } from './private.routes'

@Injectable()
export class PrivateRateLimiterMiddleware implements NestMiddleware {
  constructor(
    private readonly rateLimiter: RateLimiterService,
    private configService: ConfigService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-api-key']?.toString()
    const limit = this.configService.get<number>('rateLimit.apiKey')
    const weight = privateRoutes[req.url.slice(1)].rateLimit

    const result = await this.rateLimiter.check(token, {
      limit,
      weight,
    })

    console.log(result) // left here for illustration purposes

    if (result.isOverLimit)
      throw new RateLimitExceededError(limit, result.secondsUntilLiftingLimit)

    next()
  }
}
