import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  async validate(token: string): Promise<boolean> {
    return !!token
  }
}
