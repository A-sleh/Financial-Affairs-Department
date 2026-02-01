import { IsInt, IsString } from 'class-validator';

export class CreateBreakerPannelDto {
  @IsString()
  location: string;
  @IsInt()
  max_breakers: number;
}
