import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";

type TokenPayload = {
  sub?: string;
  perfil?: string;
};

function isJwtError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === 401
  );
}

export async function readEmpresaVaga(app: FastifyInstance) {
  app.get("/vagas/empresa", async (request, reply) => {
    try {
      const user = await request.jwtVerify<TokenPayload>();

      if (user.perfil !== "EMPRESA" || !user.sub) {
        return reply.status(403).send({
          message: "Apenas empresas podem acessar suas vagas.",
        });
      }

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

      const vagas = await prisma.vaga.findMany({
        where: {
          empresaId: empresa.id,
        },
        orderBy: {
          criadoEm: "desc",
        },
      });

      return reply.send(vagas);
    } catch (error) {
      if (isJwtError(error)) {
        return reply.status(401).send({
          message: "Token ausente ou inválido.",
        });
      }

      console.error(error);

      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });
}
