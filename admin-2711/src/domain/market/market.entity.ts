import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Point,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Owner } from '../owner/owner.entity';
import { Order } from '../order/order.entity';
import { Settle } from '../settle/settle.entity';
import { Product } from '../product/product.entity';

@Entity('markets')
export class Market {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'point' })
  address: Point;

  @ManyToOne(() => Owner, (owner) => owner.markets, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'id' })
  owner: Owner;

  @OneToMany(() => Product, (order) => order.market)
  products: Product[];

  @OneToMany(() => Order, (order) => order.market)
  orders: Order[];

  @OneToMany(() => Order, (order) => order.market)
  settles: Settle[];
}