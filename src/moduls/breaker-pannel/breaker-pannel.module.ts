import { Module } from '@nestjs/common';
import { BreakerPannelService } from './breaker-pannel.service';
import { BreakerPannelController } from './breaker-pannel.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { BreakerPannel } from './entities/breaker-pannel.entity';
import { BreakerPannelsUser } from '../breaker-pannels-users/entities/breaker-pannels-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BreakerPannel,BreakerPannelsUser])],
  controllers: [BreakerPannelController],
  providers: [BreakerPannelService],
})
export class BreakerPannelModule {}
