import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { map } from 'rxjs/operators';
import {
  TRANSFORM_KEEP_KEY_METADATA,
  PAGE_KEY_METADATA,
} from '../contants/decorator.contants';
import { ResponseDto } from '../class/res.class';
import { OFFSET, LIMIT } from '@/common/contants/page.constants';

/**
 * 统一处理返回接口结果，如果不需要则添加@Keep装饰器
 */
export class ApiTransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const http = context.switchToHttp();
        const response = http.getResponse<FastifyReply>();
        const request = http.getRequest<FastifyRequest>();
        const keep = this.reflector.get<boolean>(
          TRANSFORM_KEEP_KEY_METADATA,
          context.getHandler(),
        );
        const page = this.reflector.get<boolean>(
          PAGE_KEY_METADATA,
          context.getHandler(),
        );

        if (keep) {
          return data;
        } else {
          response.header('Content-Type', 'application/json; charset=utf-8');

          if (page) {
            const offset = Number(request.query['offset']) || OFFSET;
            const limit = Number(request.query['limit']) || LIMIT;
            if (Array.isArray(data)) {
              const [items, count] = data;
              data = {
                items,
                count,
                offset,
                limit,
              };
            } else {
              data = {
                ...data,
                offset,
                limit,
              };
            }
          }

          return new ResponseDto(200, data);
        }
      }),
    );
  }
}
