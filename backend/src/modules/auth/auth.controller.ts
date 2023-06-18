import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public-decorator.decorator';
import { AuthLoginDto } from 'src/shared/dto/auth-login.dto';
import { JwtAuthGuard } from '~/guards/jwt-auth.guard';
import { AuthService, TokenType } from './auth.service';
import { Request } from 'express';
import { ResponseType } from '~/utils/response/response.type';
import { User } from '../user/entities/user.entity';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(
    @Body() authLoginDto: AuthLoginDto
  ): Promise<ResponseType<{ access_token: string }>> {
    return this.authService.login(authLoginDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('whoami')
  async whoami(@Req() req: Request): Promise<ResponseType<User>> {
    return this.authService.whoami(req?.user as TokenType);
  }
}
