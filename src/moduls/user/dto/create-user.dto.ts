import { Subscription_type } from '@/moduls/breaker-pannels-users/entities/breaker-pannels-user.entity';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  breaker_pannel_id: number;

  @IsEnum(Subscription_type)
  subscribe_type: Subscription_type;

  @IsString()
  quantity: string;

  @IsInt()
  counter_intial_value: number | null;
}
