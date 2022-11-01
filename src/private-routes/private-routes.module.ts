import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { RateLimiterModule } from '../rate-limiter/rate-limiter.module'
import { PrivateRoutesController } from './private-routes.controller'
import { AuthMiddleware } from './auth.middleware'
import { PrivateRateLimiterMiddleware } from './private.rate-limiter.middleware'
import { AuthService } from './auth.service'
import { ApiKeyRepository } from './api-key.repository'

@Module({
  imports: [RateLimiterModule],
  controllers: [PrivateRoutesController],
  providers: [
    AuthService,
    {
      provide: ApiKeyRepository,
      // We are using a simple mocked database here, just to illustrate the concept.
      useFactory: () => {
        const apiKeys = () => [
          '026a2f78-d68c-4e9e-8c9c-ad53f1c74cec',
          '3dc36e31-0ef7-4fde-9894-1b93ce59e6a3',
          '030743e0-bd92-4baa-801a-282710b5648b',
          '95a80b45-87ab-457f-84e1-e4805e020b1c',
          '974a0506-0d03-40b4-b030-08e30b99130f',
        ]

        const apiKeyRepositoryMock = {
          exists: async (apiKey: string) => apiKeys().includes(apiKey),
          all: async () => apiKeys(),
        }
        return apiKeyRepositoryMock
      },
    },
  ],
})
export class PrivateRoutesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, PrivateRateLimiterMiddleware)
      .forRoutes('private')
  }
}
