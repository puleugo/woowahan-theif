import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Reward } from '../reward/reward.entity';
import { ProductSnapshot } from '../product/product-snapshot.entity';

@Entity('order_products')
export class OrderProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  orderId: number;

  @Column({ type: 'int' })
  productSnapshotId: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => Order, (order) => order.orderProduct)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(
    () => ProductSnapshot,
    (productSnapshot) => productSnapshot.orderProduct,
  )
  @JoinColumn({ name: 'product_snapshot_id', referencedColumnName: 'id' })
  snapshot: ProductSnapshot;

  @OneToOne(() => Reward, (reward) => reward.orderProduct)
  reward: Reward;

  @Column({ type: 'varchar', length: 255 })
  paymentsMethod: string; // 현금, 토스페이, 카카오페이, 카드결제

  @CreateDateColumn()
  createdAt: Date;
}
