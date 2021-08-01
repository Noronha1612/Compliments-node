import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  /** Representa o ID do usuário no formato UUID */
  @PrimaryColumn()
  readonly id: string;

  /** Representa o nome do usuário */
  @Column()
  name: string;

  /** Representa o email do usuário */
  @Column()
  email: string;

  /** Representa a senha do usuário */
  @Column()
  password: string;

  /** Representa se o usuário é admin ou não */
  @Column()
  admin: boolean;

  /** Representa o timestamp de criação do usuário */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /** Representa o timestamp de atualização do usuário */
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
