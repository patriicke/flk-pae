import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public-decorator.decorator';
import { ResponseType } from './utils/response/response.type';

@ApiTags('Default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @Get()
  welcome(): ResponseType<null> {
    return this.appService.welcome();
  }
}
