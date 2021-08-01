import { Tag } from './Tag';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity('compliments')
export class Compliment {
  /** Id do elogio */
  @PrimaryColumn()
  readonly id: string;

  /** Mensagem de elogio */
  @Column()
  message: string;

  /** Id do usuário que mandou o elogio */
  @Column()
  user_sender: string;

  /** Id do usuário que recebeu o elogio */
  @Column()
  user_receiver: string;

  /** Id da tag do elogio */
  @Column()
  tag_id: string;

  /** Usuário que mandou o elogio */
  @JoinColumn({ name: 'user_sender' })
  @ManyToOne(() => User)
  userSender: User;

  /** Usuário que recebeu o elogio */
  @JoinColumn({ name: 'user_receiver' })
  @ManyToOne(() => User)
  userReceiver: User;
  
  /** Tag do elogio */
  @JoinColumn({ name: 'tag_id' })
  @ManyToOne(() => Tag)
  tag: Tag;

  /** Data de criação do elogio */
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
