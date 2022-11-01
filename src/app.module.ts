import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { cacheModule } from './cache/cache-module'

@Module({
  imports: [cacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
