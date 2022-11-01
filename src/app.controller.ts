import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() request: Request): Promise<string> {
    return await this.appService.getHello(request.ip)
  }
}
