import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { generateKeyPairSync } from 'crypto'

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello(ip: string): Promise<string> {
    const timestamp = Date.now()
    const key = `api:${timestamp}:${ip}`
    const keys = await this.cacheManager.store.keys(`*:${ip}`)
    const keyvalues = await Promise.all(
      keys.map(key =>
        Promise.all([
          key,
          this.cacheManager.get(key),
          this.cacheManager.store.ttl(key),
        ])
      )
    )
    const cached = await this.cacheManager.get<string>(key)

    console.log({ keyvalues })
    if (cached) {
      return cached
    }

    await this.cacheManager.set(key, 'Hello World! ' + timestamp, { ttl: 5 })

    return 'Hello World!'
  }
}
