import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return instanceToPlain(plainToInstance(User, data));
      }),
    );
  }
}
