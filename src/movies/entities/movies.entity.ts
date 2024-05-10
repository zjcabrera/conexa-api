import { BaseEntity } from '../../config/database/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IMovie } from 'src/interfaces';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity('movies')
export class MovieEntity extends BaseEntity implements IMovie {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  opening_crawl: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({ nullable: false })
  genre: string;

  @Column({ nullable: true })
  director: string;

  @Column({ nullable: true })
  producer: string;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.movies)
  createdBy: UserEntity;
}
