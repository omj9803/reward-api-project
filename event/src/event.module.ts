import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { RewardController } from './reward.controller';
import { RewardRequestController } from './reward-request.controller';
import { RewardService } from './reward.service'
import { RewardRequestService } from './reward-request.service'
import { EventService } from './event.service';
import { Event, EventSchema } from './event.schema';
import { Reward, RewardSchema } from './reward.schema';
import { RewardRequest, RewardRequestSchema } from './reward-request.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/nest'),
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: RewardRequest.name, schema: RewardRequestSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'jwt-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [EventController, RewardController, RewardRequestController],
  providers: [EventService, JwtStrategy, RewardService, RewardRequestService],
})
export class EventModule {}
