import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'owners' })
export class Owner {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('timestamp')
  purchaseDate: Date;
}
