import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";

type TokenPayload = {
  sub?: string;
  perfil?: string;
  email?: string;
};

const createVagaSchema = z.object({
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  cursoAlvo: z.string().min(1),
  cidade: z.string().min(1),
  informacoesContato: z.string().min(1),
});

function isJwtError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === 401
  );
}

export async function createVaga(app: FastifyInstance) {
  app.post("/vagas", async (request, reply) => {
    try {
      const user = await request.jwtVerify<TokenPayload>();

      if (user.perfil !== "EMPRESA" || !user.sub) {
        return reply.status(403).send({
          message: "Apenas empresas podem cadastrar vagas",
        });
      }

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

      if (empresa.statusCadastro !== "APROVADA") {
        return reply.status(403).send({
          message: "Empresa ainda não foi aprovada pelo admin",
        });
      }

      const body: Record<string, string> = {};

      for await (const part of request.parts()) {
        if (part.type === "field") {
          body[part.fieldname] = String(part.value);
        }
      }

      const data = createVagaSchema.parse(body);

      const vaga = await prisma.vaga.create({
        data: {
          empresaId: empresa.id,
          titulo: data.titulo,
          descricao: data.descricao,
          cursoAlvo: data.cursoAlvo,
          cidade: data.cidade,
          informacoesContato: data.informacoesContato,
        },
      });

      return reply.status(201).send(vaga);
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
