import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches
} from 'class-validator';
import { EUserRoleType } from '~/shared/enums/EUserType';

const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/;

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'John'
  })
  @IsNotEmpty()
  @IsString()
    first_name: string;

  @ApiProperty({
    required: true,
    example: 'Doe'
  })
  @IsString()
  @IsNotEmpty()
    last_name: string;

  @ApiProperty({
    required: true,
    example: '+250788888888'
  })
  @IsNotEmpty()
  @IsPhoneNumber()
    phone_number: string;

  @ApiProperty({
    required: true,
    example: 'example@gmail.com'
  })
  @IsNotEmpty()
  @IsEmail()
    email: string;

  @ApiProperty({
    required: true,
    example: 'Rwanda'
  })
  @IsNotEmpty()
  @IsString()
    country: string;

  @ApiProperty({
    required: true,
    example: 'Kigali'
  })
  @IsNotEmpty()
  @IsString()
    region: string;

  @ApiProperty({
    required: true,
    example: 'password'
  })
  @IsNotEmpty()
  @IsString()
    password: string;

  @ApiProperty({
    required: true,
    example: '2000-05-10'
  })
  @Matches(DATE_REGEX, {
    message: 'Invalid date format. Expected format: YYYY-MM-DD'
  })
    dob: string;

  @ApiProperty({
    required: false,
    example: 'member'
  })
  @IsNotEmpty()
    role: EUserRoleType;
}
