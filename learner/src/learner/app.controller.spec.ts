import { Test, TestingModule } from '@nestjs/testing';
import { LearnerController } from './learner.controller';
import { LearnerService } from './learner.service';

describe('LearnerController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [LearnerController],
      providers: [LearnerService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<LearnerController>(LearnerController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
