import * as redis from 'cache-manager-redis-store'
import { CacheModule } from '@nestjs/common'

export const cacheModule = CacheModule.register({
  store: redis,
  socket: {
    host: 'localhost',
    port: 6379,
  },
  isGlobal: true,
})
