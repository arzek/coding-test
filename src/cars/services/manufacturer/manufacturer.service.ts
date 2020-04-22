import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Manufacturer } from '../../entities/manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  create(manufacturerDto: Manufacturer): Promise<Manufacturer> {
    return this.manufacturerRepository.save(manufacturerDto);
  }

  async deleteOne(id: string): Promise<void> {
    const { affected } = await this.manufacturerRepository.delete(id);
    if (!affected) {
      throw new NotFoundException('Car not found');
    }
  }
}
