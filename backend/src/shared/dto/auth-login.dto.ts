import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    required: true,
    example: 'example@gmail.com'
  })
  @IsEmail()
    email: string;

  @ApiProperty({
    required: true,
    example: 'password'
  })
  @IsNotEmpty()
    password: string;
}
