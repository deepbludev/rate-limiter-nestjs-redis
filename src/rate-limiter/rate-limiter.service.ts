import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class RateLimiterService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello(token: string): Promise<string> {
    const limit = 5
    const ttl = 10 // 10 secs
    const timestamp = Date.now()
    const id = Math.random().toString(36).slice(2)
    const key = `api:${token}:${id}`
    const keys = await this.cacheManager.store.keys(`api:${token}:*`)
    const keyvalues = await Promise.all(
      keys.map(key =>
        Promise.all([
          key,
          this.cacheManager.get(key),
          this.cacheManager.store.ttl(key),
        ])
      )
    )

    if (keyvalues.length >= limit)
      throw new HttpException(
        {
          status: HttpStatus.TOO_MANY_REQUESTS,
          error: 'You have exceeded the limit of requests per hour: ' + limit,
        },
        HttpStatus.TOO_MANY_REQUESTS
      )

    console.log({ ip: token, requests: keyvalues.length, keyvalues })

    await this.cacheManager.set(key, timestamp, { ttl })

    return 'Hello World!'
  }
}