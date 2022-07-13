import { DateAudit } from 'src/base/date_audit.entity'
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'blogs' })
export class Blog extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string

  @Column()
  content: string

  constructor(partial: Partial<Blog>) {
    super()
    Object.assign(this, partial)
  }
}
