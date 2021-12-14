import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { DiabetesPrediction } from "./index";

@ObjectType()
@Entity()
export default class PredictionCode {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  diabetesPredictionId: Number;

  @Field(() => DiabetesPrediction, { nullable: true })
  @OneToOne(() => DiabetesPrediction, { nullable: true })
  diabetesPrediction: DiabetesPrediction;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
