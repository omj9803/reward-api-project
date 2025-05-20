import { Controller, Post, Get, Req, Body, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Request } from 'express';

@Controller('events')
export class GatewayEventController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async proxyCreateEvent(@Body() body: any, @Req() req: Request) {
    const token = req.headers['authorization'];
    const res$ = this.httpService.post('http://event:3000/events', body, {
      headers: { Authorization: token },
    });
    const response = await lastValueFrom(res$);
    return response.data;
  }

  @Get()
  async proxyGetEvents(@Req() req: Request) {
    const token = req.headers['authorization'] as string;
    const res$ = this.httpService.get('http://event:3000/events', {
      headers: { Authorization: token },
    });
    const response = await lastValueFrom(res$);
    return response.data;
  }
}
