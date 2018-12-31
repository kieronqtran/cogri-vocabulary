import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { KeyCacheService } from './key-cache.service';

describe('JwtService', () => {
  let service: JwtStrategy;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
			providers: [
				JwtStrategy,
				{ provide: KeyCacheService, useClass: jest.fn() },
			],
    }).compile();
    service = module.get<JwtStrategy>(JwtStrategy);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
