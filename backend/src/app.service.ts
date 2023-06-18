import { Injectable } from '@nestjs/common';
import { EResponseType } from './shared/enums/EResponseType';
import { ResponseService } from '~/utils/response/response.service';
import { ResponseType } from './utils/response/response.type';

@Injectable()
export class AppService {
  constructor(private readonly responseService: ResponseService) {}
  welcome(): ResponseType<null> {
    return this.responseService.makeResponse(
      'Welcome to T-FINDINGS-API version 1.0.0',
      200,
      null,
      EResponseType.SUCCESS
    );
  }
}
