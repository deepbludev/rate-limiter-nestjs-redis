import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { CACHE_MANAGER, HttpStatus, INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from '../src/app.module'
import { ApiKeyRepository } from '../src/private-routes/api-key.repository'
import { Cache } from 'cache-manager'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let cache: Cache
  let validApiKey: string
  let apiKeyLimit: number
  let ipLimit: number

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()

    const configService = module.get(ConfigService)
    apiKeyLimit = configService.get<number>('rateLimit.apiKey')
    ipLimit = configService.get<number>('rateLimit.ip')

    const apiKeyRepo = await module.get<ApiKeyRepository>(ApiKeyRepository)
    validApiKey = (await apiKeyRepo.all()).pop()

    cache = await app.get(CACHE_MANAGER)
    await cache.reset()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.OK)
      .expect('API OK')
  })

  describe('public routes', () => {
    beforeEach(async () => {
      await cache.reset()
    })

    afterAll(async () => {
      await cache.reset()
    })

    const validRequest = () => request(app.getHttpServer()).get('/public/a')

    describe('rate limiting', () => {
      it('should return 429 if too many requests', async () => {
        let res = await validRequest()
        expect(res.status).toEqual(HttpStatus.OK)

        for (let i = 0; i <= ipLimit; i++) res = await validRequest()
        expect(res.status).toEqual(HttpStatus.TOO_MANY_REQUESTS)
      })
    })
  })

  describe('private routes', () => {
    beforeEach(async () => {
      await app.get(CACHE_MANAGER).reset()
    })

    afterAll(async () => {
      await cache.reset()
    })

    const validRequest = () =>
      request(app.getHttpServer())
        .get('/private/a')
        .set('x-api-key', validApiKey)

    describe('authorization', () => {
      it('should return 200 if valid token', async () => {
        const res = await validRequest()
        expect(res.status).toEqual(HttpStatus.OK)
      })

      it('should return 401 if no token', async () => {
        const res = await request(app.getHttpServer()).get('/private/a')
        expect(res.status).toEqual(HttpStatus.UNAUTHORIZED)
      })

      it('should return 401 if invalid token', async () => {
        const res = await request(app.getHttpServer())
          .get('/private/a')
          .set('x-api-key', 'invalid-api-key')
        expect(res.status).toEqual(HttpStatus.UNAUTHORIZED)
      })
    })

    describe('rate limiting', () => {
      beforeEach(async () => {
        await app.get(CACHE_MANAGER).reset()
      })

      it('should return 429 if too many requests', async () => {
        let res = await validRequest()
        expect(res.status).toEqual(HttpStatus.OK)

        for (let i = 0; i <= apiKeyLimit; i++) res = await validRequest()
        expect(res.status).toEqual(HttpStatus.TOO_MANY_REQUESTS)
      })
    })
  })
})
