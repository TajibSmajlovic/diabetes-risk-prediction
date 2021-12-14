import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { config } from "dotenv";

import DiabetesPredictionResolver from "./resolvers/DiabetesPrediction";
import { DiabetesPrediction, PredictionCode } from "./entities";

const loadEnvVariables = () => {
  const env = config();

  if (env.error) {
    throw env.error;
  }
};

const main = async () => {
  loadEnvVariables();

  await createConnection({
    username: process.env.DB_USERNAME,
    password: process.env.DB_USERNAME,
    type: "postgres",
    database: "DiabetesRiskPrediction",
    entities: [DiabetesPrediction, PredictionCode],
    synchronize: true,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [DiabetesPredictionResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

main().catch((err) => console.error(err));
