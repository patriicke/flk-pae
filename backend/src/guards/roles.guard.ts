import { Injectable, Dependencies } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Observable } from 'rxjs';
import { EUserRoleType } from '~/shared/enums/EUserType';

@Injectable()
@Dependencies(Reflector)
export class RolesGuard {
  reflector: Reflector;
  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  canActivate(context): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role: EUserRoleType) =>
      user.role.includes(role)
    );
  }
}
