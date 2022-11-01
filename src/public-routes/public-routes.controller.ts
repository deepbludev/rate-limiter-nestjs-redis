import { Controller, Get, HttpStatus } from '@nestjs/common'

@Controller('public')
export class PublicRoutesController {
  @Get('a')
  async a(): Promise<{ status: number; message: string }> {
    return {
      status: HttpStatus.OK,
      message: 'Public Route A',
    }
  }
}
