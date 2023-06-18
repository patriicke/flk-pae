import { User } from './entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getRepository, Repository } from 'typeorm';
import { ResponseService } from 'src/utils/response/response.service';
import { EResponseType } from 'src/shared/enums/EResponseType';
import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { PaginationType, handlePaginatedData } from '~/utils/pagination';
import { ResponseType } from '~/utils/response/response.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly responseService: ResponseService
  ) {}

  async getUsers(
    options: IPaginationOptions
  ): Promise<ResponseType<PaginationType<User>>> {
    const data = await paginate<User>(this.userRepository, options);
    const formatted_data = handlePaginatedData<User>(data);
    return this.responseService.makeResponse(
      'USERS RETRIEVED SUCCESSFULLY',
      HttpStatus.OK,
      formatted_data,
      EResponseType.SUCCESS
    );
  }

  public async create(createUserDto: CreateUserDto): Promise<ResponseDto> {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        phone_number,
        country,
        region,
        dob,
        role
      } = createUserDto;

      const userExists: User | false = await this.userRepository.findOne({
        where: { email }
      });

      if (userExists) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const user: User = this.userRepository.create({
        first_name,
        last_name,
        email,
        password,
        phone_number,
        country,
        region,
        dob,
        role
      });

      const saved_user = await this.userRepository.save(user);

      delete saved_user.password;

      const response: ResponseDto = this.responseService.makeResponse(
        'USER CREATED SUCCESSFUL',
        HttpStatus.CREATED,
        { user: saved_user },
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

  async findByEmail(email: string): Promise<User> {
    const user = await getRepository(User)
      .createQueryBuilder()
      .addSelect('User.password')
      .where('User.email = :email', { email })
      .getOne();
    return user;
  }

  findAll() {
    return 'This action returns all users';
  }

  async findOneById(id: string): Promise<User> {
    const user = await getRepository(User)
      .createQueryBuilder()
      .where('User.id = :id', { id })
      .getOne();
    return user;
  }

  async findOneUser(id: string): Promise<ResponseType<User>> {
    const user = await this.findOneById(id);

    if (!user.id) {
      return this.responseService.makeResponse(
        'USER NOT FOUND',
        HttpStatus.NOT_FOUND,
        null,
        EResponseType.ERROR
      );
    }

    return this.responseService.makeResponse(
      'USER RETRIEVED SUCCESSFULLY',
      HttpStatus.OK,
      { user },
      EResponseType.SUCCESS
    );
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<ResponseType<User>> {
    const user = await this.findOneById(id);

    if (!user.id) {
      return this.responseService.makeResponse(
        'USER NOT FOUND',
        HttpStatus.NOT_FOUND,
        null,
        EResponseType.ERROR
      );
    }

    await this.userRepository.update(id, updateUserDto);

    const updatedUser = await this.findOneById(id);

    return this.responseService.makeResponse(
      'USER UPDATED SUCCESSFULLY',
      HttpStatus.OK,
      { user: updatedUser },
      EResponseType.SUCCESS
    );
  }

  async delete(id: string): Promise<ResponseType<User>> {
    const user = await this.findOneById(id);

    if (!user.id) {
      return this.responseService.makeResponse(
        'USER NOT FOUND',
        HttpStatus.NOT_FOUND,
        null,
        EResponseType.ERROR
      );
    }

    await this.userRepository.delete(id);

    return this.responseService.makeResponse(
      'USER DELETED SUCCESSFULLY',
      HttpStatus.OK,
      null,
      EResponseType.SUCCESS
    );
  }
}
