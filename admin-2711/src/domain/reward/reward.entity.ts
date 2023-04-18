import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProduct } from '../order/order-product.entity';
import { Settlement } from '../settle/settle.entity';

@Entity('rewards')
export class Reward {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  orderProductId: number;

  @Column({ type: 'int' })
  settleId: number;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'text' })
  reason: string;

  @OneToOne(() => OrderProduct, (orderProduct) => orderProduct.reward)
  @JoinColumn({ name: 'order_product_id' })
  orderProduct: OrderProduct;

  @ManyToOne(() => Settlement, (settle) => settle.rewards)
  @JoinColumn({ name: 'settle_id' })
  settle: Settlement;

  @CreateDateColumn()
  createdAt: Date;
}
