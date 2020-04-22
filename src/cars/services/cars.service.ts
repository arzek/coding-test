import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Car } from '../entities/car.entity';

@Injectable()
export class CarsService {
  private relations = ['manufacturer', 'owners'];

  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) {}

  findAll(): Promise<Car[]> {
    return this.carRepository.find({ relations: this.relations });
  }

  findOne(id: string): Promise<Car> {
    return this.carRepository.findOne(id, { relations: this.relations });
  }
}
