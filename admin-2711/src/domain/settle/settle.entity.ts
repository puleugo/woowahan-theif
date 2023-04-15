import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { User } from '../user/user.entity';
import { Reward } from '../reward/reward.entity';

@Entity('settles')
export class Settle {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => User, (user) => user.settles)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Order, (order) => order.settle)
  orders: Order[];

  @OneToMany(() => Reward, (rewards) => rewards.settle)
  rewards: Reward;

  @CreateDateColumn()
  @Index()
  createdAt: Date;
}
