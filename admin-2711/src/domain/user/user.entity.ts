import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../order/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => Order, (order) => order.userId)
  orders: Order[];
}
