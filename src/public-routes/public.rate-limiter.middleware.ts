import { Request, Response, NextFunction } from 'express'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RateLimiterService } from '../rate-limiter/rate-limiter.service'
import { publicRoutes } from './public.routes'

@Injectable()
export class PublicRateLimiterMiddleware implements NestMiddleware {
  constructor(
    private readonly rateLimiterService: RateLimiterService,
    private configService: ConfigService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.ip
    const path = req.url.slice(1)
    const limit = this.configService.get<number>('rateLimit.ip')
    const { weight } = publicRoutes[path].rateLimit

    await this.rateLimiterService.checkUsage(token, { limit, weight })
    next()
  }
}
