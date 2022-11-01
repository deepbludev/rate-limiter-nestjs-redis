import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Cache } from 'cache-manager'
import { v4 as uuid } from 'uuid'

@Injectable()
export class RateLimiterService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async checkUsage(
    token: string,
    opts?: { limit?: number; weight?: number }
  ): Promise<string> {
    const { limit = 10, weight = 1 } = opts || {}
    const ttl = 20
    const id = uuid()
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const totalWeight = keyvalues.reduce((acc, [key, value]) => {
      return acc + value
    }, 0)

    if (totalWeight >= limit) {
      console.log({
        ip: token,
        requests: keyvalues.length,
        totalWeight,
        keyvalues,
        untilReset: keyvalues[0] ? keyvalues[0][2] : 0,
      })
      throw new HttpException(
        {
          status: HttpStatus.TOO_MANY_REQUESTS,
          error: 'You have exceeded the limit of requests per hour: ' + limit,
        },
        HttpStatus.TOO_MANY_REQUESTS
      )
    }

    await this.cacheManager.set(key, weight, { ttl })

    return 'Hello World!'
  }
}
