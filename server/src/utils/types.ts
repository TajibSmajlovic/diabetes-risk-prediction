import { Field, InputType } from "type-graphql";

import { BinaryType } from "./enums";

@InputType()
export class PredictInput {
  @Field()
  age!: number;

  @Field()
  gender!: BinaryType;

  @Field()
  polyuria!: BinaryType;

  @Field()
  polydipsia!: BinaryType;

  @Field()
  polyphagia!: BinaryType;

  @Field()
  alopecia!: BinaryType;

  @Field()
  obesity!: BinaryType;

  @Field()
  partialParesis!: BinaryType;

  @Field()
  genitalThrush!: BinaryType;

  @Field()
  suddenWeightLoss!: BinaryType;

  @Field()
  visualBlurring!: BinaryType;

  @Field()
  itching!: BinaryType;

  @Field()
  irritability!: BinaryType;

  @Field()
  delayedHealing!: BinaryType;

  @Field()
  muscleStiffness!: BinaryType;

  @Field()
  weakness!: BinaryType;
}
