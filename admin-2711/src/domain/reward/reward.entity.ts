import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProduct } from '../order/order-product.entity';

@Entity('rewards')
export class Reward {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  orderProductId: number;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'text' })
  reason: string;

  @OneToOne(() => OrderProduct, (orderProduct) => orderProduct.reward)
  @JoinColumn({ name: 'order_product_id' })
  orderProduct: OrderProduct;

  @CreateDateColumn()
  createdAt: Date;
}
