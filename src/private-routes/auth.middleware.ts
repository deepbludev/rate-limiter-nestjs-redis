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
    const apiToken = req.headers['api-token']?.toString()
    const isValid = await this.authService.validate(apiToken)

    if (!isValid) {
      const status = HttpStatus.UNAUTHORIZED
      const error = 'The API token is missing or invalid ' + apiToken
      throw new HttpException({ status, error }, status)
    }

    next()
  }
}
