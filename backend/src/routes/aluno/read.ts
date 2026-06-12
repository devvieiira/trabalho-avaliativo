import type { FastifyInstance } from "fastify/types/instance.js";
import { prisma } from "../../lib/prisma.js";
import { decrypt } from "../../lib/crypto.js";

export async function readAll(app: FastifyInstance) {
  app.get("/alunos", async (request, reply) => {
    try {
      const dbData = await prisma.aluno.findMany();

      const alunos = await Promise.all(
        dbData.map(async (item) => {
          ((item.nome = await decrypt(item.nome)),
            (item.curso = await decrypt(item.curso)),
            (item.telefone = item.telefone
              ? await decrypt(item.telefone)
              : null));
          item.curso = await decrypt(item.curso);
          return item;
        }),
      );
      return reply.status(200).send({
        data: alunos,
      });
    } catch (error) {
      console.error(error);
      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });
}
