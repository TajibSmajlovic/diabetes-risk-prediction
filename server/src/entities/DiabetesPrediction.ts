import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";

import { PredictionCode } from "./index";
import { BinaryType } from "../utils/enums";

@ObjectType()
@Entity()
export default class DiabetesPrediction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Number)
  @Column()
  age!: number;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  gender!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  polyuria!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  polydipsia!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  polyphagia!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  alopecia!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  obesity!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  partialParesis!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  genitalThrush!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  suddenWeightLoss!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  visualBlurring!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  itching!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  irritability!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  delayedHealing!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  muscleStiffness!: BinaryType;

  @Field(() => Number)
  @Column({ type: "enum", enum: BinaryType })
  weakness!: BinaryType;

  @Field(() => Number)
  @Column()
  predictedResult!: BinaryType;

  @Field(() => Number, { nullable: true })
  @Column({ default: null })
  diagnosisResult?: BinaryType;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  predictionCodeId: Number;

  @Field(() => PredictionCode, { nullable: true })
  @OneToOne(() => PredictionCode, { nullable: true })
  predictionCode: PredictionCode;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
