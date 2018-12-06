import { Test, TestingModule } from '@nestjs/testing';
import { KeyCacheService } from './key-cache.service';

describe('KeyCacheService', () => {
  let service: KeyCacheService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyCacheService],
    }).compile();
    service = module.get<KeyCacheService>(KeyCacheService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
