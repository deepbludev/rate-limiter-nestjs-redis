import { Controller, Get, HttpStatus } from '@nestjs/common'
import { publicRoutes } from './public.routes'

@Controller('public')
export class PublicRoutesController {
  @Get(publicRoutes.a.path)
  async a(): Promise<{ status: number; message: string }> {
    return {
      status: HttpStatus.OK,
      message: 'Public Route A',
    }
  }

  @Get(publicRoutes.b.path)
  async b(): Promise<{ status: number; message: string }> {
    return {
      status: HttpStatus.OK,
      message: 'Public Route B',
    }
  }

  @Get(publicRoutes.c.path)
  async c(): Promise<{ status: number; message: string }> {
    return {
      status: HttpStatus.OK,
      message: 'Public Route C',
    }
  }
}
