import { PartialType } from '@nestjs/mapped-types';
import { CreateBreakerPannelDto } from './create-breaker-pannel.dto';

export class UpdateBreakerPannelDto extends PartialType(CreateBreakerPannelDto) {}
