import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/shared/dto/auth-login.dto';
import { User } from '../user/entities/user.entity';
import { EUserRoleType } from '~/shared/enums/EUserType';
import { EUserStatusType } from '~/shared/enums/EUserStatusType';
import { ResponseDto } from '~/shared/dto/response.dto';
import { ResponseService } from '~/utils/response/response.service';
import { EResponseType } from '~/shared/enums/EResponseType';
import { UserService } from '../user/user.service';
import { ResponseType } from '~/utils/response/response.type';

export type TokenType = {
  id: string;
  role: EUserRoleType;
  status: EUserStatusType;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly responseService: ResponseService
  ) {}

  async login(
    authLoginDto: AuthLoginDto
  ): Promise<ResponseType<{ access_token: string }>> {
    try {
      const { email, password } = authLoginDto;

      const user: User = await this.usersService.findByEmail(email);

      if (!(await user?.validate_password(password))) {
        return this.responseService.makeResponse(
          'INVALID CREDENTIALS',
          HttpStatus.UNAUTHORIZED,
          null,
          EResponseType.ERROR
        );
      }

      const payload = {
        id: user.id,
        role: user.role,
        status: user.status,
        email: user.email
      };

      return this.responseService.makeResponse(
        'LOGIN SUCCESSFUL',
        HttpStatus.OK,
        {
          access_token: this.jwtService.sign(payload)
        },
        EResponseType.SUCCESS
      );
    } catch (error) {
      const response: ResponseDto = this.responseService.makeResponse(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        EResponseType.ERROR
      );
      return response;
    }
  }

  async whoami(user: TokenType): Promise<ResponseType<User>> {
    try {
      const foundUser: User = await this.usersService.findOneById(user.id);

      const response: ResponseDto = this.responseService.makeResponse(
        'USER FOUND SUCCESSFUL',
        HttpStatus.OK,
        {
          user: foundUser
        },
        EResponseType.SUCCESS
      );
      return response;
    } catch (error) {
      const response: ResponseDto = this.responseService.makeResponse(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        null,
        EResponseType.ERROR
      );
      return response;
    }
  }
}
