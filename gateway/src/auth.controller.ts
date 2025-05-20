import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class GatewayAuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('register')
  async proxyRegister(@Body() body: any) {
    const res$ = this.httpService.post('http://auth:3000/auth/register', body);
    const response = await lastValueFrom(res$);
    return response.data;
  }

  @Post('login')
  async proxyLogin(@Body() body: any) {
    const res$ = this.httpService.post('http://auth:3000/auth/login', body);
    const response = await lastValueFrom(res$);
    return response.data;
  }
}
