import { Connection, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ManufacturerService } from '../manufacturer/manufacturer.service';

import { Car } from '../../entities/car.entity';

import { CarDto } from '../../dto/car.dto';

@Injectable()
export class CarsService {
  private relations = ['manufacturer', 'owners'];

  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private manufacturerService: ManufacturerService,
    private connection: Connection,
  ) {}

  async create(carDto: CarDto): Promise<Car> {
    const car = new Car(carDto);
    await this.connection.manager.save(car.manufacturer);
    await this.connection.manager.save(car.owners);
    return this.connection.manager.save(car);
  }

  findAll(): Promise<Car[]> {
    return this.carRepository.find({ relations: this.relations });
  }

  async findOne(id: string): Promise<Car> {
    const car = await this.carRepository.findOne(id, {
      relations: this.relations,
    });
    if (car) {
      return car;
    }
    throw new NotFoundException('Car not found');
  }

  async deleteOne(id: string): Promise<void> {
    const car = await this.findOne(id);
    await this.carRepository.delete(id);
    await this.manufacturerService.deleteOne(car.manufacturer.id);
  }
}
