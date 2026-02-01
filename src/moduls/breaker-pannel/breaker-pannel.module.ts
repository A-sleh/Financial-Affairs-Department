import { Module } from '@nestjs/common';
import { BreakerPannelService } from './breaker-pannel.service';
import { BreakerPannelController } from './breaker-pannel.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { BreakerPannel } from './entities/breaker-pannel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BreakerPannel])],
  controllers: [BreakerPannelController],
  providers: [BreakerPannelService],
})
export class BreakerPannelModule {}
