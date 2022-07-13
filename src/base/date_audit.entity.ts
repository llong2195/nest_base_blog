import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm'

export class DateAudit extends BaseEntity {
  @Column({ default: false })
  deleted: boolean

  @CreateDateColumn({
    default: `now()`,
    nullable: true,
  })
  createdAt: string

  @UpdateDateColumn({
    default: `now()`,
    nullable: true,
  })
  updatedAt: string
}
