import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderProduct } from '../order/order-product.entity';
import { Market } from '../market/market.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'uuid' })
  marketId: string;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProduct: OrderProduct[];

  @ManyToOne(() => Market, (market) => market.products)
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  market: Market;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
