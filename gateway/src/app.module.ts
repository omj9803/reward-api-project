import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { HttpModule } from '@nestjs/axios';
import { GatewayEventController } from './event.controller';
import { GatewayAuthController } from './auth.controller';
import { GatewayRewardController } from './reward.controller';
import { GatewayRewardRequestController } from './reward-request.controller';
import { PassportModule } from '@nestjs/passport'; 
import { JwtModule } from '@nestjs/jwt';           
import { JwtStrategy } from './jwt.strategy';      

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: 'jwt-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [GatewayAuthController, GatewayEventController, GatewayRewardController, GatewayRewardRequestController],
  providers: [JwtStrategy, JwtModule, AuthGuard, RolesGuard],
})
export class AppModule {}
