import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { RewardService } from './reward.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('rewards')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  @Roles('OPERATOR', 'ADMIN')
  create(@Body() body: any, @Req() req: Request) {
    const user = req.user as any;
    return this.rewardService.create(body, user.username);
  }

  @Get()
  @Roles('USER', 'OPERATOR', 'ADMIN')
  findAll() {
    return this.rewardService.findAll();
  }
}
