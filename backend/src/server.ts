import "dotenv/config";
import fastify from "fastify";
import { createAluno } from "./aluno/create.js";
import fastifyMultipart from "@fastify/multipart";

const app = fastify();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.register(fastifyMultipart);

app.register(async (instance) => {
  instance.register(createAluno);
});

app.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log("Running...");
});
