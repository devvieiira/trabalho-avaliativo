import type { FastifyInstance } from "fastify/types/instance.js";
import { prisma } from "../../lib/prisma.js";
import { decrypt } from "../../lib/crypto.js";

export async function readOne(app: FastifyInstance) {
  app.get("/alunos/:idAluno", async (request, reply) => {
    try {
      const { idAluno } = request.params as { idAluno: string };
      const dbData = await prisma.aluno.findUnique({
        where: { id: idAluno },
        include: {
          usuario: true,
        },
      });

      if (!dbData) {
        return reply.status(404).send({
          message: "Aluno not found",
        });
      }

      const aluno = {
        id: dbData.id,
        nome: await decrypt(dbData.nome),
        curso: await decrypt(dbData.curso),
        telefone: dbData.telefone ? await decrypt(dbData.telefone) : null,
        email: dbData.usuario.email,
      };

      return reply.status(200).send({
        data: aluno,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });
}
