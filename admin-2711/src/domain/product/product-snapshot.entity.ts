import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { OrderProduct } from '../order/order-product.entity';

@Entity('product_snapshots')
export class ProductSnapshot extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  productId: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.snapshot)
  orderProduct: OrderProduct[];

  @ManyToOne(() => Product, (product) => product.snapshots)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}
