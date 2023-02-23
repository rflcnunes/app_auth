import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

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
  createdAt: Date;

  @Column({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
