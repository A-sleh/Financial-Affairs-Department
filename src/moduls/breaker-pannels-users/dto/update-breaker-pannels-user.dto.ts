import { PartialType } from '@nestjs/mapped-types';
import { CreateBreakerPannelsUserDto } from './create-breaker-pannels-user.dto';

export class UpdateBreakerPannelsUserDto extends PartialType(CreateBreakerPannelsUserDto) {}
