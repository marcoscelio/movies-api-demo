import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
@Unique(["name"])
export class User {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({
    length: 100,
  })
  name: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt?: Date;
}
