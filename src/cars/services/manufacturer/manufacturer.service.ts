import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Manufacturer } from '../../entities/manufacturer.entity';

import { ManufacturerDto } from '../../dto/manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
  ) {}

  async update(
    id: string,
    manufacturerDto: ManufacturerDto,
  ): Promise<Manufacturer> {
    const manufacturer = new Manufacturer(manufacturerDto);
    await this.manufacturerRepository.update(id, manufacturer);
    return this.findOne(id);
  }

  async findOne(id: string): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.findOne(id);

    if (manufacturer) {
      return manufacturer;
    }

    throw new NotFoundException('Manufacturer not found');
  }

  async deleteOne(id: string): Promise<void> {
    const { affected } = await this.manufacturerRepository.delete(id);
    if (!affected) {
      throw new NotFoundException('Car not found');
    }
  }
}
