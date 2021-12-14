import { getConnection } from "typeorm";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

import instance from "../utils/apiConfig";
import { PredictionCode, DiabetesPrediction } from "../entities";
import { BinaryType } from "../utils/enums";
import { PredictInput } from "../utils/types";
import { validateInputFields } from "../utils/validation";
import { diabetesPredictionQueryBuilder, generateCode } from "../utils/helpers";

@Resolver(DiabetesPrediction)
export default class DiabetesPredictionResolver {
  @Query(() => [DiabetesPrediction], { nullable: true })
  async predictions() {
    return await DiabetesPrediction.find();
  }

  @Mutation(() => Boolean)
  async predict(@Arg("args") args: PredictInput) {
    try {
      validateInputFields(args);

      const axios = instance(),
        query = diabetesPredictionQueryBuilder(args);

      const predictedResultResponse = (await axios.post(query)).data as [
        Boolean
      ];

      const predictedResult: BinaryType = predictedResultResponse[0]
        ? BinaryType.True
        : BinaryType.False;

      const diabetesPrediction = DiabetesPrediction.create({
        ...args,
        predictedResult,
      });

      const predictionCodeResponse = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(PredictionCode)
        .values({
          code: generateCode(),
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

      return true;
    } catch {
      return false;
    }
  }
}
