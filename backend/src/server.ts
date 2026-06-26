import "dotenv/config";
import fastify from "fastify";
import fjwt from "@fastify/jwt";
import { createAluno } from "./routes/aluno/create.js";
import fastifyMultipart from "@fastify/multipart";
import { readAll } from "./routes/aluno/read.js";
import { readOne } from "./routes/aluno/readOne.js";
import { updateAluno } from "./routes/aluno/update.js";
import { loginRoute } from "./routes/auth/login.js";
import { createEmpresa } from "./routes/empresa/create.js";
import { createVaga } from "./routes/vaga/create.js";
import { updateVaga } from "./routes/vaga/update.js";
import { deleteVaga } from "./routes/vaga/delete.js";
import { adminRoutes } from "./routes/admin/index.js";
import cors from "@fastify/cors";
import { meRoute } from "./routes/usuarios/me.js";
import { readVaga } from "./routes/vaga/read.js";
import { readOneVaga } from "./routes/vaga/readOne.js";
import { readEmpresaVaga } from "./routes/vaga/readEmpresa.js";

const app = fastify();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.register(fastifyMultipart);

await app.register(cors, {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

app.register(fjwt, {
  secret: process.env.JWT_ASSIGN || "secret-key",
});

app.register(async (instance) => {
  instance.register(loginRoute);
  instance.register(createAluno);
  instance.register(readAll);
  instance.register(readOne);
  instance.register(updateAluno);
  instance.register(createEmpresa);
  instance.register(createVaga);
  instance.register(updateVaga);
  instance.register(deleteVaga);
  instance.register(adminRoutes);
  instance.register(meRoute);
  instance.register(readVaga);
  instance.register(readOneVaga);
  instance.register(readEmpresaVaga);
});

app.listen({ port: 4000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
  console.log("Running...");
});
