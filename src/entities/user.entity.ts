import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedDate: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedDate: Date;
}
