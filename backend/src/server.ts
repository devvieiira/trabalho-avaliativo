import "dotenv/config";
import fastify from "fastify";
import { createAluno } from "./routes/aluno/create.js";
import fastifyMultipart from "@fastify/multipart";
import { readAll } from "./routes/aluno/read.js";
import { readOne } from "./routes/aluno/readOne.js";
import { updateAluno } from "./routes/aluno/update.js";

const app = fastify();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.register(fastifyMultipart);

app.register(async (instance) => {
  instance.register(createAluno);
  instance.register(readAll);
  instance.register(readOne);
  instance.register(updateAluno);
});

app.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log("Running...");
});
