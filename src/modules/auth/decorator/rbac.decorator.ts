import { SetMetadata } from '@nestjs/common';
import { RBACDto } from '../dto/rbac.dto';

export const RBAC_KEY = 'RBAC_KEYs';
export const RBAC = (...rbacData: RBACDto[]) => {
  return SetMetadata(RBAC_KEY, rbacData);
};
