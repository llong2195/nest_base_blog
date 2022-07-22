import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RBAC_KEY } from '../decorator/rbac.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RBACDto } from '../dto/rbac.dto';
import { Connection } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

@Injectable()
export class RBACGuard extends JwtAuthGuard {
  constructor(
    private readonly connection: Connection,
    private reflector: Reflector,
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

    console.log('User : ', user);

    return await this.checkRBAC(requiredRBAC[0], user.id);
  }
  async checkRBAC(rbacDto: RBACDto, userId: EntityId): Promise<boolean> {
    const data = await this.connection.query(`SELECT * FROM nest_blog.permission
    inner join users on users.per_id = permission.id
    where users.id = ${userId}`);
    console.log('admin : ', data);

    if (data[0]?.name === 'ADMIN') {
      return true;
    }
    const sql = `SELECT * FROM nest_blog.permission
    inner join per_detail on per_detail.per_id = permission.id
    where per_id = ${data[0]?.per_id} and per_detail.action_name = '${rbacDto.action}' and per_detail.table_name = '${rbacDto.table}'
  `;

    const query = await this.connection.query(sql);
    console.log('query', query);
    if (query[0]?.name === 'ADMIN') {
      return true;
    }

    if (query.length) {
      return true;
    }

    return false;
  }
}
