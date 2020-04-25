import { subMonths } from 'date-fns';
import { Repository, Between } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Owner } from '../entities/owner.entity';

import { OwnerDto } from '../dto/owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async removeByPurchaseDateRange(range = 18): Promise<Owner[]> {
    const nowDate = new Date();
    const owners = await this.ownerRepository.find({
      where: {
        purchaseDate: Between(subMonths(nowDate, range), nowDate),
      },
    });

    return this.ownerRepository.remove(owners);
  }

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
