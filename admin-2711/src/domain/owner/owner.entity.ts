import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Market } from '../market/market.entity';
import { Settlement } from '../settle/settle.entity';

@Entity('owners')
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  account: string;

  @OneToMany(() => Market, (market) => market.owner)
  markets: Market[];

  @OneToMany(() => Settlement, (settle) => settle.settlementOwner)
  settles: Settlement[];
}
