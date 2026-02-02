import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBreakerPannelDto {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsInt()
  max_breakers: number;
}
