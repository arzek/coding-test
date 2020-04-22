import { Connection, Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ManufacturerService } from '../manufacturer/manufacturer.service';

import { Car } from '../../entities/car.entity';

import { CreateCarDto } from '../../dto/create-car.dto';

@Injectable()
export class CarsService {
  private relations = ['manufacturer', 'owners'];

  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    private readonly manufacturerService: ManufacturerService,
    private readonly connection: Connection,
  ) {}

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

  async create(carDto: CreateCarDto): Promise<Car> {
    const car = new Car(carDto);
    if (car.manufacturer) {
      await this.connection.manager.save(car.manufacturer);
    }

    if (car.owners) {
      await this.connection.manager.save(car.owners);
    }

    return this.connection.manager.save(car);
  }

  async editOne(id: string, carDto: CreateCarDto): Promise<Car> {
    const car = new Car(carDto);
    await this.carRepository.update(id, car);
    return this.findOne(id);
  }

  async deleteOne(id: string): Promise<void> {
    const car = await this.findOne(id);
    await this.carRepository.delete(id);
    await this.manufacturerService.deleteOne(car.manufacturer.id);
  }
}
