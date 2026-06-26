import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";
import { encrypt } from "../../lib/crypto.js";

const updateAlunoSchema = z.object({
  nome: z.string().min(1).optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),
});

export async function updateAluno(app: FastifyInstance) {
  app.patch("/usuarios/me", async (request, reply) => {
    try {
      const payload = await request.jwtVerify<{ sub: string }>();

      const usuarioId = payload.sub;

      const body: Record<string, string> = {};

      for await (const part of request.parts()) {
        if (part.type === "field") {
          body[part.fieldname] = String(part.value);
        }
      }

      const data = updateAlunoSchema.parse(body);

      if (Object.keys(data).length === 0) {
        return reply.status(400).send({
          message: "Nenhum dado informado.",
        });
      }

      const alunoData: Record<string, string> = {};

      if (data.nome) {
        alunoData.nome = await encrypt(data.nome);
      }

      if (data.telefone) {
        alunoData.telefone = await encrypt(data.telefone);
      }

      await prisma.$transaction(async (tx) => {
        if (Object.keys(alunoData).length > 0) {
          await tx.aluno.update({
            where: {
              usuarioId,
            },
            data: alunoData,
          });
        }

        if (data.email) {
          await tx.usuario.update({
            where: {
              id: usuarioId,
            },
            data: {
              email: data.email,
            },
          });
        }
      });

      return reply.send({
        message: "Perfil atualizado com sucesso.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: "Dados inválidos.",
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return reply.status(404).send({
            message: "Usuário não encontrado.",
          });
        }

        if (error.code === "P2002") {
          return reply.status(409).send({
            message: "E-mail já cadastrado.",
          });
        }
      }

      console.error(error);

      return reply.status(500).send({
        message: "Erro interno.",
      });
    }
  });
}
