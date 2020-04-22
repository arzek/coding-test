import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Owner } from '../../entities/owner.entity';

import { OwnerDto } from '../../dto/owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async update(id: string, ownerDto: OwnerDto): Promise<Owner> {
    const owner = new Owner(ownerDto);
    await this.ownerRepository.update(id, owner);
    return this.findOne(id);
  }

  async findOne(id: string): Promise<Owner> {
    const owner = await this.ownerRepository.findOne(id);

    if (owner) {
      return owner;
    }

    throw new NotFoundException('Owner not found');
  }
}
