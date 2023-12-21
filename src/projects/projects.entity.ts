import { Entity, Column, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column({nullable: true})
  description?: string;

  @OneToMany(() => Card, (card) => card.project)
  cards?: Card[]

  @OneToMany(() => Link, (link) => link.project)
  links?: Link[]
}

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Project, (project) => project.cards)
  project: Project

  @Column()
  cardType: 'data-source' | 'insight' | 'fact' | 'conclusion';

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  factType?: 'wish' | 'pain' | 'quote' | 'good';

  @Column({ nullable: true })
  dataSourceType?: string;

  @Column({ nullable: true })
  source?: string;

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  date?: Date;
}

@Entity()
export class CardData {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Card, { eager: true })
  @JoinColumn()
  forCard: Card;
  
  @Column()
  data: string;
}

@Entity()
export class Link {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Project, (project) => project.cards)
  project: Project

  @ManyToOne(() => Card, { eager: true })
  @JoinColumn()
  sourceCard: Card

  @ManyToOne(() => Card, { eager: true })
  @JoinColumn()
  targetCard: Card
}
