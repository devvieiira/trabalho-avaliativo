import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";
import { encrypt } from "../../lib/crypto.js";

const updateAlunoSchema = z.object({
  nome: z.string().min(1).optional(),
  curso: z.string().min(1).optional(),
  telefone: z.string().optional(),
});

const paramsSchema = z.object({
  id: z.string(),
});

export async function updateAluno(app: FastifyInstance) {
  app.patch("/alunos/:id", async (request, reply) => {
    try {
      const { id } = paramsSchema.parse(request.params);

      const body: Record<string, string> = {};

      for await (const part of request.parts()) {
        if (part.type === "field") {
          body[part.fieldname] = String(part.value);
        }
      }

      const data = updateAlunoSchema.parse(body);

      if (Object.keys(data).length === 0) {
        return reply.status(400).send({
          message: "Nenhum dado fornecido para atualização",
        });
      }

      const dataToUpdate: Record<string, string> = {};

      if (data.nome) dataToUpdate.nome = await encrypt(data.nome);
      if (data.curso) dataToUpdate.curso = await encrypt(data.curso);
      if (data.telefone) dataToUpdate.telefone = await encrypt(data.telefone);

      const alunoAtualizado = await prisma.aluno.update({
        where: {
          usuarioId: id,
        },
        data: dataToUpdate,
      });

      return reply.status(200).send({
        message: "Aluno atualizado com sucesso",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return reply.status(404).send({
            message: "Aluno não encontrado",
          });
        }
      }

      console.error(error);

      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });
}
