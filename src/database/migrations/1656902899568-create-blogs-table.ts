import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateBlogsTable1656902899568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'blogs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'deleted',
            type: 'tinyInt',
            default: 0,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('blogs')
  }
}
