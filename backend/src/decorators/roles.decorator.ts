import { SetMetadata } from '@nestjs/common';
import { EUserRoleType } from '~/shared/enums/EUserType';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EUserRoleType[]) =>
  SetMetadata(ROLES_KEY, roles);
