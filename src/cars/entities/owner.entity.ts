import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('timestamp')
  purchaseDate: Date;
}
