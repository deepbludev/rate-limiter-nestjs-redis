import { Injectable } from '@nestjs/common'
import { ApiKeyRepository } from './api-key.repository'

@Injectable()
export class AuthService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}
  async validate(token: string): Promise<boolean> {
    return this.apiKeyRepository.exists(token)
  }
}
