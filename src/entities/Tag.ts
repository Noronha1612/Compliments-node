import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('tags')
export class Tag {
  /** Representa o ID da Tag no formato UUID */
  @PrimaryColumn()
  readonly id: string;

  /** Representa o nome da Tag */
  @Column()
  name: string;

  /** Representa o timestamp de criação da Tag */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  /** Representa o timestamp de atualização da Tag */
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
