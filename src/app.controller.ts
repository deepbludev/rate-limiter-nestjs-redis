import { Controller, Get, Ip } from '@nestjs/common'
import { RateLimiterService } from './rate-limiter/rate-limiter.service'

@Controller()
export class AppController {
  constructor(private readonly appService: RateLimiterService) {}

  @Get()
  async status(@Ip() ip: string): Promise<string> {
    return await this.appService.getHello(ip, { weight: 25 })
  }
}
