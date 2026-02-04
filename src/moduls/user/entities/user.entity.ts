import { BreakerPannelsUser } from '@/moduls/breaker-pannels-users/entities/breaker-pannels-user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column('varchar', { length: 255 })
  full_name: string;

  @Column('varchar', { length: 12 })
  phone: string;

  @OneToMany(
    () => BreakerPannelsUser,
    (breakerPannelsUser) => breakerPannelsUser.user,
  )
  pannels: BreakerPannelsUser[];
}
