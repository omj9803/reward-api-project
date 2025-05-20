import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { JwtAuthGuard } from './jwt-auth.guard';
import { lastValueFrom } from 'rxjs';
import { Request } from 'express';

@Controller('rewards')
@UseGuards(JwtAuthGuard)
export class GatewayRewardController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async createReward(@Body() body: any, @Req() req: Request) {
    const token = req.headers['authorization'] as string;

    try {
      const res$ = this.httpService.post(
        'http://event:3000/rewards',
        body,
        { headers: { Authorization: token } },
      );
      const response = await lastValueFrom(res$);
      return response.data;
    } catch (e: any) {
      throw new HttpException(
        e?.response?.data || 'Gateway error',
        e?.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get()
  async getRewards(@Req() req: Request) {
    const token = req.headers['authorization'] as string;

    try {
      const res$ = this.httpService.get('http://event:3000/rewards', {
        headers: { Authorization: token },
      });
      const response = await lastValueFrom(res$);
      return response.data;
    } catch (e: any) {
      throw new HttpException(
        e?.response?.data || 'Gateway error',
        e?.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
