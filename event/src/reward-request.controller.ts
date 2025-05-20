import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RewardRequestService } from './reward-request.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('reward-requests')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @Post()
  @Roles('USER', 'OPERATOR', 'ADMIN')
  create(@Body() body: any, @Req() req: Request) {
    const user = req.user as any;
    return this.rewardRequestService.create(body, user.username);
  }

  @Get('my')
  @Roles('USER', 'OPERATOR', 'ADMIN')
  findMy(@Req() req: Request) {
    const user = req.user as any;
    return this.rewardRequestService.findMy(user.username);
  }

  @Get()
  @Roles('OPERATOR', 'ADMIN')
  findAll() {
    return this.rewardRequestService.findAll();
  }
}
