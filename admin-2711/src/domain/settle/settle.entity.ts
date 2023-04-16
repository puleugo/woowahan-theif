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
import { Reward } from '../reward/reward.entity';
import { Owner } from '../owner/owner.entity';

@Entity('settles')
export class Settle {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid' })
  ownerId: string;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => Owner, (owner) => owner.settles)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: Owner;

  @OneToMany(() => Order, (order) => order.settle)
  orders: Order[];

  @OneToMany(() => Reward, (rewards) => rewards.settle)
  rewards: Reward;

  @CreateDateColumn()
  @Index()
  createdAt: Date;
}
