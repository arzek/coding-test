import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OwnerDto } from '../dto/owner.dto';
import { Car } from './car.entity';

@Entity({ name: 'owners' })
export class Owner {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('timestamp')
  purchaseDate: Date;

  @ManyToOne(
    type => Car,
    car => car.owners,
    { onDelete: 'CASCADE' },
  )
  car: Car;

  constructor(ownerDto: OwnerDto) {
    if (ownerDto) {
      this.name = ownerDto.name;
      this.purchaseDate = ownerDto.purchaseDate;
    }
  }
}
