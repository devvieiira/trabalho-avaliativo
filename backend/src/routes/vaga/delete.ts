import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";

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

export async function deleteVaga(app: FastifyInstance) {
  app.delete("/vagas/:id", async (request, reply) => {
    try {
      const user = await request.jwtVerify<TokenPayload>();

      if (user.perfil !== "EMPRESA" || !user.sub) {
        return reply.status(403).send({
          message: "Apenas empresas podem excluir vagas",
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
          message: "Empresa não encontrada",
        });
      }

      const vaga = await prisma.vaga.findUnique({
        where: {
          id,
        },
      });

      if (!vaga) {
        return reply.status(404).send({
          message: "Vaga não encontrada",
        });
      }

      if (vaga.empresaId !== empresa.id) {
        return reply.status(403).send({
          message: "Esta vaga não pertence à empresa logada",
        });
      }

      await prisma.vaga.delete({
        where: {
          id,
        },
      });

      return reply.status(200).send({
        message: "Vaga excluída com sucesso",
      });
    } catch (error) {
      if (isJwtError(error)) {
        return reply.status(401).send({
          message: "Token ausente ou inválido",
        });
      }

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
