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

  @Column({ nullable: false })
  @CreateDateColumn()
  createdDate: Date;

  @Column({ nullable: true })
  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ nullable: true })
  @DeleteDateColumn()
  deletedDate: Date;
}
