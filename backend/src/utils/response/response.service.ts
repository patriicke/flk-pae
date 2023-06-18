import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResponseDto } from 'src/shared/dto/response.dto';
import { EResponseType } from 'src/shared/enums/EResponseType';
import 'dotenv/config';

@Injectable({ scope: Scope.REQUEST })
export class ResponseService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public makeResponse<T>(
    message: string,
    statusCode: number,
    data: T | null,
    responseType: EResponseType
  ): ResponseDto {
    const { route, method } = this.request;
    const responseDto: ResponseDto = {
      success: responseType == EResponseType.SUCCESS ? true : false,
      statusCode: statusCode,
      message: message,
      data: data,
      path: route.path,
      method
    };
    return responseDto;
  }
}
