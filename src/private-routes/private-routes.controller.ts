import { Controller, Get, HttpStatus } from '@nestjs/common'

@Controller('private')
export class PrivateRoutesController {
  @Get('a')
  async a(): Promise<{ status: number; message: string }> {
    return {
      status: HttpStatus.OK,
      message: 'Private Route A',
    }
  }
}
