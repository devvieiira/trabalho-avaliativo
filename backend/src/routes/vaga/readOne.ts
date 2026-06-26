import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";
import { z } from "zod";

type TokenPayload = {
  sub?: string;
  perfil?: string;
  email?: string;
};

const paramsSchema = z.object({
  id: z.string(),
});

function isJwtError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === 401
  );
}

export async function readOneVaga(app: FastifyInstance) {
  app.get("/vagas/:id", async (request, reply) => {
    try {
      const user = await request.jwtVerify<TokenPayload>();

      if (user.perfil !== "EMPRESA" || !user.sub) {
        return reply.status(403).send({
          message: "Apenas empresas podem acessar esta vaga.",
        });
      }

      const { id } = paramsSchema.parse(request.params);

      const empresa = await prisma.empresa.findUnique({
        where: {
          usuarioId: user.sub,
        },
      });

      if (!empresa) {
        return reply.status(404).send({
          message: "Empresa não encontrada.",
        });
      }

      const vaga = await prisma.vaga.findUnique({
        where: {
          id,
        },
      });

      if (!vaga) {
        return reply.status(404).send({
          message: "Vaga não encontrada.",
        });
      }

      if (vaga.empresaId !== empresa.id) {
        return reply.status(403).send({
          message: "Esta vaga não pertence à empresa logada.",
        });
      }

      return reply.send(vaga);
    } catch (error) {
      if (isJwtError(error)) {
        return reply.status(401).send({
          message: "Token ausente ou inválido.",
        });
      }

      console.error(error);

      return reply.status(500).send({
        message: "Erro ao buscar vaga.",
      });
    }
  });
}
