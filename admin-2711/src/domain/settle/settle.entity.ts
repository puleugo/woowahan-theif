import {
  BeforeInsert,
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
import { Market } from '../market/market.entity';
import { Owner } from '../owner/owner.entity';

@Entity('settlements')
export class Settlement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid' })
  marketId: string;

  @Column({ type: 'uuid' })
  settlementOwnerId: string;

  @Column({ type: 'text' })
  settlementAccount: string;

  @Column({ type: 'int' })
  amount: number;

  @ManyToOne(() => Market, (market) => market.settles)
  @JoinColumn({ name: 'market_id', referencedColumnName: 'id' })
  market: Market;

  @ManyToOne(() => Owner, (owner) => owner.settles, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'settlement_owner_id', referencedColumnName: 'id' })
  settlementOwner: Owner;

  @OneToMany(() => Order, (order) => order.settle)
  orders: Order[];

  @OneToMany(() => Reward, (rewards) => rewards.settle)
  rewards: Reward[];

  @CreateDateColumn()
  @Index()
  createdAt: Date;

  @BeforeInsert()
  async updateSettlementAccount(): Promise<void> {
    if (this.settlementOwner) {
      const owner = await this.settlementOwner;
      this.settlementAccount = owner.account;
    }
  }
}
