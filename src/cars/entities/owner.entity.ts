import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { OwnerDto } from '../dto/owner.dto';

@Entity({ name: 'owners' })
export class Owner {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('timestamp')
  purchaseDate: Date;

  constructor(ownerDto: OwnerDto) {
    if (ownerDto) {
      this.name = ownerDto.name;
      this.purchaseDate = ownerDto.purchaseDate;
    }
  }
}
