import { Injectable } from '@nestjs/common'

/**
 * We are using a simple mocked database here, just to illustrate the concept.
 */
const tokenRepositoryMock = {
  exists: async (token: string) =>
    [
      '026a2f78-d68c-4e9e-8c9c-ad53f1c74cec',
      '3dc36e31-0ef7-4fde-9894-1b93ce59e6a3',
      '030743e0-bd92-4baa-801a-282710b5648b',
      '95a80b45-87ab-457f-84e1-e4805e020b1c',
      '974a0506-0d03-40b4-b030-08e30b99130f',
    ].includes(token),
}

@Injectable()
export class AuthService {
  async validate(token: string): Promise<boolean> {
    return tokenRepositoryMock.exists(token)
  }
}
