import { Controller, Get, HttpStatus } from '@nestjs/common'
import { privateRoutes } from './private.routes'

@Controller('private')
export class PrivateRoutesController {
  @Get(privateRoutes.a.path)
  async a(): Promise<{ status: number; message: string }> {
    return {
      status: HttpStatus.OK,
      message: 'Private Route A',
    }
  }
  @Get(privateRoutes.b.path)
  async b(): Promise<{ status: number; message: string }> {
    return {
      status: HttpStatus.OK,
      message: 'Private Route B',
    }
  }
  @Get(privateRoutes.c.path)
  async c(): Promise<{ status: number; message: string }> {
    return {
      status: HttpStatus.OK,
      message: 'Private Route B',
    }
  }
}
