import { Test, TestingModule } from '@nestjs/testing';
import { SendEmailService } from './send-email.service';

describe('SendEmailService', () => {
  let service: SendEmailService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendEmailService],
    }).compile();
    service = module.get<SendEmailService>(SendEmailService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
