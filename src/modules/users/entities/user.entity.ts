import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { DateAudit } from 'src/base/date_audit.entity'

@Entity({ name: 'users' })
export class User extends DateAudit {
  @PrimaryGeneratedColumn()
  id: number

  @Unique(['email'])
  @Column()
  email: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Exclude()
  @Column()
  password: string

  @Column({ default: true })
  isActive: boolean

  constructor(partial: Partial<User>) {
    super()
    Object.assign(this, partial)
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
