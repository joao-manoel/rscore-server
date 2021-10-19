import { Test, TestingModule } from '@nestjs/testing';
import { GenerateRefreshToken } from './generate-refresh-token';

describe('GenerateRefreshToken', () => {
  let provider: GenerateRefreshToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateRefreshToken],
    }).compile();

    provider = module.get<GenerateRefreshToken>(GenerateRefreshToken);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
