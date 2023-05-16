import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import RealEstate from './realEstate.entity';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 45, unique: true })
  name: string;

  @OneToMany(() => RealEstate, (realEstate) => realEstate.category)
  realEstate: RealEstate;
}

export default Category;
