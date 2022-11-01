import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RateLimiterService } from '../rate-limiter/rate-limiter.service'
import { privateRoutes } from './private.routes'

@Injectable()
export class PrivateRateLimiterMiddleware implements NestMiddleware {
  constructor(
    private readonly rateLimiterService: RateLimiterService,
    private configService: ConfigService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-api-key']?.toString()
    const path = req.url.slice(1)
    const limit = this.configService.get<number>('rateLimit.apiKey')
    const { weight } = privateRoutes[path].rateLimit

    await this.rateLimiterService.checkUsage(token, { limit, weight })
    next()
  }
}
