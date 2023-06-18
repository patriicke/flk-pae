import { ResponseService } from '../../utils/response/response.service';
import { User } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { ResponseModule } from 'src/utils/response/response.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ResponseModule],
  controllers: [UserController],
  providers: [UserService, ResponseService]
})
export class UserModule {}
