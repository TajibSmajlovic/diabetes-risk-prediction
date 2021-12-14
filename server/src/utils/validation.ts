import { PredictInput } from "./types";

export function validateInputFields(inputFields: PredictInput) {
  for (const [key, value] of Object.entries(inputFields)) {
    if (key === "age") continue;

    if (![0, 1].includes(value)) {
      throw new Error("Invalid Input Args!");
    }
  }
}
