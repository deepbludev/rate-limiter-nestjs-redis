import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { cacheModule } from './cache/cache-module'

describe('AppController', () => {
  let app: TestingModule
  let appController: AppController

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [cacheModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      expect(await appController.getHello()).toBe('Hello World!')
    })
  })
})
