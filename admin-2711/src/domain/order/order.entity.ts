import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { OrderProduct } from './order-product.entity';
import { Settlement } from '../settle/settle.entity';
import { Market } from '../market/market.entity';
import { OrderStatusEnum } from './order-status.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  marketId: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'int' })
  settleId: number;

  @Column({ type: 'enum', enum: OrderStatusEnum })
  status: OrderStatusEnum;

  @ManyToOne(() => User, (user) => user.orders, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Market, (market) => market.orders, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  market: Market;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProduct: OrderProduct[];

  @ManyToOne(() => Settlement, (settle) => settle.orders)
  @JoinColumn({ name: 'settle_id', referencedColumnName: 'id' })
  settle: Settlement;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
