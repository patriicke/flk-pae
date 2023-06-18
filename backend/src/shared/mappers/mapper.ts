import { EUserRoleType } from '../enums/EUserType';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { User } from '../../modules/user/entities/user.entity';
export const toUserDto = (userData: User): CreateUserDto => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    country,
    region,
    password,
    dob
  } = userData;

  const userDto: CreateUserDto = {
    first_name,
    last_name,
    email,
    phone_number,
    country,
    region,
    password,
    dob,
    role: EUserRoleType.MEMBER
  };
  return userDto;
};
