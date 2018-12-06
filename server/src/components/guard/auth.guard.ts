import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    if (process.env.NODE_ENV === 'test') {
      return true;
    }
    const permissions = this.reflector.get<string[]>(
      'scopes',
      context.getHandler(),
    );
    if (!permissions) {
      return true;
    }
    const canActivated = (await super.canActivate(context)) as boolean;
    if (!canActivated) {
      return canActivated;
    }
    const [request, response] = [
      context.switchToHttp().getRequest<Request>(),
      context.switchToHttp().getResponse<Response>(),
    ];
    const user = request.user;
    const hasPermission = () =>
			user.scope.split(' ').some(permission => permissions.includes(permission));
    return user && user.scope && hasPermission();
  }
}
