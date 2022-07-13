// import { User } from "src/users/user.entity";
import { MigrationInterface, QueryRunner } from 'typeorm'
import * as bcrypt from 'bcrypt'

export class seedingUserTable1656918639412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash(
      '12345678',
      parseInt(process.env.BCRYPT_SALT, 10) || 10,
    )
    await queryRunner.query(`
        INSERT INTO users (email, firstName, lastName, password) 
        VALUES ('nduylong9501@gmail.com', 'Long', 'Nguyễn', '${password}');
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM users`)
  }
}
