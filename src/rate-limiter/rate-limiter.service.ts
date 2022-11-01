import { v4 as uuid } from 'uuid'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'

@Injectable()
export class RateLimiterService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async checkLimits(token: string, opts: { limit: number; weight?: number }) {
    const { limit, weight = 1 } = opts

    const keys = await this.cacheManager.store.keys(`rate-limit:${token}:*`)

    const values = await Promise.all<{ weight: number }>(
      keys.map(k => this.cacheManager.get(k))
    )

    const ttls = await Promise.all(
      keys.map(k => this.cacheManager.store.ttl(k))
    )
    const secondsUntilLiftingLimit = Math.max(...ttls) || 0

    const totalWeight = values.reduce((acc, val) => acc + val.weight, 0)
    const isOverLimit = totalWeight > limit

    const key = `rate-limit:${token}:${uuid()}`
    if (!isOverLimit) await this.cacheManager.set(key, weight, { ttl: 60 * 60 }) // 1 hour

    return {
      token,
      isOverLimit,
      totalWeight,
      secondsUntilLiftingLimit,
    }
  }
}
