import { Test, TestingModule } from '@nestjs/testing'
import { Request } from 'express'

import { AppController } from './app.controller'
import { RateLimiterModule } from './rate-limiter/rate-limiter.module'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpMocks = require('node-mocks-http')

describe('AppController', () => {
  let app: TestingModule
  let appController: AppController
  let req: Request

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [RateLimiterModule],
      controllers: [AppController],
    }).compile()

    appController = app.get<AppController>(AppController)

    req = httpMocks.createRequest({
      method: 'GET',
      ip: '1.1.1.1',
    })

    console.log({ appController })
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello(req)).toBe('Hello World!')
    })
  })
})
