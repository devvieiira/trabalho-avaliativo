import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";

export async function readVaga(app: FastifyInstance) {
  app.get("/vagas", async (_, reply) => {
    try {
      const vagas = await prisma.vaga.findMany({
        where: {
          status: "ABERTA",
        },
        include: {
          empresa: {
            select: {
              razaoSocial: true,
            },
          },
        },
        orderBy: {
          criadoEm: "desc",
        },
      });

      return reply.send(
        vagas.map((vaga) => ({
          id: vaga.id,
          titulo: vaga.titulo,
          descricao: vaga.descricao,
          cursoAlvo: vaga.cursoAlvo,
          cidade: vaga.cidade,
          informacoesContato: vaga.informacoesContato,
          status: vaga.status,
          dataPublicacao: vaga.criadoEm,
          empresa: vaga.empresa.razaoSocial,
        })),
      );
    } catch (error) {
      console.error(error);

      return reply.status(500).send({
        message: "Erro ao listar vagas.",
      });
    }
  });
}
