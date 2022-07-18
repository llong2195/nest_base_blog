import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RBAC_KEY } from '../decorator/rbac.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RBACDto } from '../dto/rbac.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class RBACGuard extends JwtAuthGuard {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const requiredRBAC = this.reflector.getAllAndOverride<RBACDto>(RBAC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('data :', requiredRBAC);

    if (!requiredRBAC) {
      return false;
    }
    const { user } = context.switchToHttp().getRequest();
    // console.log(req);

    // console.log('User : ', user);

    return await this.authService.checkRBAC(requiredRBAC, user.id);
  }
}
