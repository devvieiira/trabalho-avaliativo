import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

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

      const usuario = await prisma.usuario.create({
        data: {
          email: data.email,
          senha: data.senha,
          perfil: "ALUNO",
          aluno: {
            create: {
              nome: data.nome,
              curso: data.curso,
              telefone: data.telefone,
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

      console.error(error);

      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });
}
