import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BreakerPannel {
  @PrimaryGeneratedColumn()
  breaker_pannel_id: number;

  @Column({type: 'varchar', length: 255})
  location: string;

  @Column({type: 'int'})
  max_breakers: number;
}
