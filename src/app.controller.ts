import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  status(): string {
    return 'API OK'
  }
}
