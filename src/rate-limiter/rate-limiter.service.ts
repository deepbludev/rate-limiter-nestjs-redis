import { v4 as uuid } from 'uuid'
import { Cache } from 'cache-manager'
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'

@Injectable()
export class RateLimiterService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async checkUsage(
    token: string,
    opts: { limit: number; weight?: number }
  ): Promise<boolean> {
    const ttl = 60 * 60 // 1 hour

    const key = `rate-limit:${token}:${uuid()}`
    const keys = await this.cacheManager.store.keys(`rate-limit:${token}:*`)

    // TODO: get key with lowest ttl
    const keyvalues = await Promise.all(
      keys.map(key =>
        Promise.all([
          key,
          this.cacheManager.get(key),
          this.cacheManager.store.ttl(key),
        ])
      )
    )

    const { limit, weight = 1 } = opts

    const totalWeight = keyvalues.reduce((acc, [, value]) => {
      return acc + value
    }, 0)

    if (totalWeight >= limit) {
      console.log({
        key,
        requests: keyvalues.length,
        totalWeight,
        // keyvalues,
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

    return true
  }
}
