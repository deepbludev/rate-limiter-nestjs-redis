import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration } from './config/configuration'
import { RateLimiterModule } from './rate-limiter/rate-limiter.module'
import { PublicRoutesModule } from './public-routes/public-routes.module'
import { PrivateRoutesModule } from './private-routes/private-routes.module'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RateLimiterModule,
    PublicRoutesModule,
    PrivateRoutesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
