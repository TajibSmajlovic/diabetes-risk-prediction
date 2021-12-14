import { PredictInput } from "./types";

export function generateCode(length: number = 7): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    charactersLength = characters.length,
    code: string[] = [];

  for (let i = 0; i < length; i++) {
    code.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }

  return code.toString().replace(/,/g, "");
}

export function diabetesPredictionQueryBuilder(
  diabetesPrediction: PredictInput
): string {
  const gender = `gender=${diabetesPrediction.gender}`;
  const age = `age=${diabetesPrediction.age}`;
  const polyuria = `polyuria=${diabetesPrediction.polyuria}`;
  const polydipsia = `polydipsia=${diabetesPrediction.polydipsia}`;
  const polyphagia = `polyphagia=${diabetesPrediction.polyphagia}`;
  const alopecia = `alopecia=${diabetesPrediction.alopecia}`;
  const obesity = `obesity=${diabetesPrediction.obesity}`;
  const suddenWeightLoss = `sudden_weight_loss=${diabetesPrediction.suddenWeightLoss}`;
  const visualBlurring = `visual_blurring=${diabetesPrediction.visualBlurring}`;
  const partialParesis = `partial_paresis=${diabetesPrediction.partialParesis}`;
  const genitalThrush = `genital_thrush=${diabetesPrediction.genitalThrush}`;
  const itching = `itching=${diabetesPrediction.itching}`;
  const irritability = `irritability=${diabetesPrediction.irritability}`;
  const weakness = `weakness=${diabetesPrediction.weakness}`;
  const delayedHealing = `delayed_healing=${diabetesPrediction.delayedHealing}`;
  const muscleStiffness = `muscle_stiffness=${diabetesPrediction.muscleStiffness}`;

  return `/diabetes-diagnosis?${gender}&${age}&${polyuria}&${polydipsia}&${polyphagia}&${alopecia}&${obesity}&${suddenWeightLoss}&${visualBlurring}&${partialParesis}&${genitalThrush}&${itching}&${irritability}&${weakness}&${delayedHealing}&${muscleStiffness}`;
}
