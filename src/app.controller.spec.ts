import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'

describe('AppController', () => {
  let app: TestingModule
  let appController: AppController

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "API OK"', async () => {
      expect(appController.status()).toBe('API OK')
    })
  })
})
