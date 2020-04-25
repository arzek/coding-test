import { Connection, Repository } from 'typeorm';

import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { HelperService } from '../helper/helper.service';

import { Car } from '../../entities/car.entity';

import { CreateCarDto } from '../../dto/create-car.dto';
import { UpdateCarDto } from '../../dto/update-car.dto';

@Injectable()
export class CarService {
  private relations = ['manufacturer', 'owners'];

  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
    @Inject(forwardRef(() => ManufacturerService))
    private readonly manufacturerService: ManufacturerService,
    private readonly helperService: HelperService,
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

  async findOneByManufacturerId(id: string): Promise<Car> {
    const car = await this.carRepository.findOne(
      {
        manufacturer: {
          id: id,
        },
      },
      {
        relations: this.relations,
      },
    );
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

  async updateOne(id: string, carDto: UpdateCarDto): Promise<Car> {
    const car = new Car(carDto);
    await this.carRepository.update(id, car);
    return this.findOne(id);
  }

  async deleteOne(id: string): Promise<void> {
    const car = await this.findOne(id);
    await this.carRepository.delete(id);
    await this.manufacturerService.deleteOne(car.manufacturer.id);
  }

  async setDiscount(
    beginMonth = 12,
    endMonth = 18,
    percentage = 20,
  ): Promise<void> {
    const cars = await this.carRepository.find();

    const nowCountMonths = this.helperService.getCountMonthsFromDate(
      new Date(),
    );
    for (const car of cars) {
      const carCountMonths = this.helperService.getCountMonthsFromDate(
        car.firstRegistrationDate,
      );
      const diffCount = nowCountMonths - carCountMonths;

      if (diffCount >= beginMonth && diffCount <= endMonth) {
        car.price += Math.floor((car.price * percentage) / 100);
        await this.carRepository.update(car.id, car);
      }
    }
  }
}
