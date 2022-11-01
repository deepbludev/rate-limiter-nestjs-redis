import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { RateLimiterService } from './rate-limiter/rate-limiter.service'

@Controller()
export class AppController {
  constructor(private readonly appService: RateLimiterService) {}

  @Get()
  async getHello(@Req() request: Request): Promise<string> {
    return await this.appService.getHello(request.ip)
  }
}
