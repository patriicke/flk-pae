import { User } from './entities/user.entity';
import { Public } from '../../decorators/public-decorator.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '~/guards/jwt-auth.guard';
import { ResponseType } from '~/utils/response/response.type';
import { PaginationType } from '~/utils/pagination';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @Public()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 409,
    description: 'Conflict. The user already exists.'
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    required: false,
    name: 'limit',
    description:
      'The limit of users you want to retrieve the default is 10 and maximum is 100'
  })
  @ApiQuery({
    required: false,
    name: 'page',
    description: 'The page you want to retrieve the users from the default is 1'
  })
  async getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ): Promise<ResponseType<PaginationType<User>>> {
    limit = limit > 100 ? 100 : limit;
    return this.usersService.getUsers({
      page,
      limit
    });
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    required: true,
    name: 'id',
    description: 'The id of the user you want to retrieve'
  })
  async getUser(@Param('id') id: string): Promise<ResponseType<User>> {
    return this.usersService.findOneUser(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    required: true,
    name: 'id',
    description: 'The id of the user you want to update'
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseType<User>> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    required: true,
    name: 'id',
    description: 'The id of the user you want to delete'
  })
  remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
