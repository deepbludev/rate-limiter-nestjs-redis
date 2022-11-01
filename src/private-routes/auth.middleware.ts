import { Request, Response, NextFunction } from 'express'
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-api-key']?.toString()
    const isValid = await this.authService.validate(token)

    if (!isValid) {
      const status = HttpStatus.UNAUTHORIZED
      const error = `API token ${token ? token + ' not found' : 'missing'}`
      throw new HttpException({ status, error }, status)
    }

    next()
  }
}
