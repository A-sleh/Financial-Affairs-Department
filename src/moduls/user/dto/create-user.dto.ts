import { Subscription_type } from '@/moduls/breaker-pannels-users/entities/breaker-pannels-user.entity';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
