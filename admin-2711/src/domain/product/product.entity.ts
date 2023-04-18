import {
  AfterInsert,
  AfterUpdate,
  BaseEntity,
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
import { Market } from '../market/market.entity';
import { ProductSnapshot } from './product-snapshot.entity';
import { dataSource } from '../../app/data-source';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'uuid' })
  marketId: string;

  @ManyToOne(() => Market, (market) => market.products)
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  market: Market;

  @OneToMany(
    () => ProductSnapshot,
    (productSnapshot) => productSnapshot.product,
  )
  snapshots: ProductSnapshot[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @AfterInsert()
  @AfterUpdate()
  async createSnapshot() {
    const productSnapshot = new ProductSnapshot();
    productSnapshot.product = this;
    productSnapshot.name = this.name;
    productSnapshot.price = this.price;

    await dataSource.getRepository(ProductSnapshot).save(productSnapshot);
  }
}
