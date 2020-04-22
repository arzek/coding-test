import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturersController } from './manufacturers.controller';

describe('Manufacturers Controller', () => {
  let controller: ManufacturersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturersController],
    }).compile();

    controller = module.get<ManufacturersController>(ManufacturersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
