import axios from "axios";

const instance = (baseURL: string = process.env.PREDICT_MODEL_URL as string) =>
  axios.create({
    baseURL,
  });

export default instance;
