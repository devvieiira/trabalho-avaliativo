import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";
import { encrypt, hashing } from "../../lib/crypto.js";

const createAlunoSchema = z.object({
  email: z.email(),
  senha: z.string().min(6),
  nome: z.string().min(1),
  curso: z.string().min(1),
  telefone: z.string(),
});

export async function createAluno(app: FastifyInstance) {
  app.post("/alunos", async (request, reply) => {
    try {
      const body: Record<string, string> = {};

      for await (const part of request.parts()) {
        if (part.type === "field") {
          body[part.fieldname] = String(part.value);
        }
      }

      const data = createAlunoSchema.parse(body);

      const usuarioExiste = await prisma.usuario.findUnique({
        where: {
          email: data.email,
        },
      });

      if (usuarioExiste) {
        return reply.status(409).send({
          message: "Este email já está em uso",
        });
      }

      //Criptografando os dados

      const hashSenha = await encrypt(data.senha);
      const hashNome = await encrypt(data.nome);
      const hashCurso = await encrypt(data.curso);
      const hashTelefone = await encrypt(data.telefone);

      const usuario = await prisma.usuario.create({
        data: {
          email: data.email,
          senha: hashSenha,
          perfil: "ALUNO",
          aluno: {
            create: {
              nome: hashNome,
              curso: hashCurso,
              telefone: hashTelefone,
            },
          },
        },
        include: {
          aluno: true,
        },
      });

      return reply.status(201).send(usuario);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return reply.status(409).send({
          errors: {
            email: "Este email já está em uso",
          },
        });
      }

      console.error(error);

      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });
}
