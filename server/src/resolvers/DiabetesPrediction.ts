import { getConnection } from "typeorm";
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

import instance from "../utils/apiConfig";
import { PredictionCode, DiabetesPrediction } from "../entities";
import { BinaryType } from "../utils/enums";
import { PredictInput } from "../utils/types";
import { validateInputFields } from "../utils/validation";
import { diabetesPredictionQueryBuilder, generateCode } from "../utils/helpers";

@ObjectType()
class PredictResponse {
  @Field()
  predictedResult!: Boolean;

  @Field()
  code?: String;
}

@Resolver(DiabetesPrediction)
export default class DiabetesPredictionResolver {
  @Query(() => [DiabetesPrediction], { nullable: true })
  async predictions() {
    return await DiabetesPrediction.find();
  }

  @Mutation(() => Boolean)
  async submitResult(
    @Arg("predictedResult") predictedResult: BinaryType,
    @Arg("code") code: string
  ) {
    const predictionCode = await getConnection()
      .getRepository(PredictionCode)
      .findOne({ where: { code: code } });

    const diabetesPredictionId = predictionCode?.diabetesPredictionId as number;

    if (!diabetesPredictionId) return false;

    const prediction = await DiabetesPrediction.findOne(diabetesPredictionId);

    await getConnection()
      .createQueryBuilder()
      .update(DiabetesPrediction)
      .set({ diagnosisResult: predictedResult })
      .where("id = :id", {
        id: prediction?.id,
      })
      .execute();

    return true;
  }

  @Mutation(() => PredictResponse)
  async predict(@Arg("args") args: PredictInput) {
    try {
      validateInputFields(args);
      const axios = instance(),
        query = diabetesPredictionQueryBuilder(args);

      console.log({ query })

      const predictedResultResponse = (await axios.post(query)).data as [
        Boolean
      ];

      console.log({ predictedResultResponse })

      const predictedResult: BinaryType = predictedResultResponse[0]
        ? BinaryType.True
        : BinaryType.False;

      const diabetesPrediction = DiabetesPrediction.create({
        ...args,
        predictedResult,
      });

      const code = generateCode();

      const predictionCodeResponse = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(PredictionCode)
        .values({
          code,
        })
        .returning("*")
        .execute();

      diabetesPrediction.predictionCodeId = predictionCodeResponse.raw[0].id;

      const diabetesPredictionResponse = await diabetesPrediction.save();

      await getConnection()
        .createQueryBuilder()
        .update(PredictionCode)
        .set({ diabetesPredictionId: diabetesPredictionResponse.id })
        .where("id = :id", {
          id: diabetesPrediction.predictionCodeId,
        })
        .execute();

      return {
        predictedResult: Boolean(diabetesPrediction.predictedResult),
        code,
      };
    } catch (err) {
      throw err;
    }
  }
}
