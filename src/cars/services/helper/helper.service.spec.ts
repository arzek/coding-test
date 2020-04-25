import { Test, TestingModule } from '@nestjs/testing';
import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelperService],
    }).compile();

    service = module.get<HelperService>(HelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getCountMonthsFromDate', () => {
    const date =
      'Sat Apr 25 2020 16:06:15 GMT+0300 (Eastern European Summer Time)';
    const count = service.getCountMonthsFromDate(new Date(date));
    expect(count).toEqual(24244);
  });
});
