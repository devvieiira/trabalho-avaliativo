import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";

type TokenPayload = {
  sub?: string;
  perfil?: string;
  email?: string;
};

const updateVagaSchema = z.object({
  titulo: z.string().min(1).optional(),
  descricao: z.string().min(1).optional(),
  cursoAlvo: z.string().min(1).optional(),
  cidade: z.string().min(1).optional(),
  informacoesContato: z.string().min(1).optional(),
});

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

export async function updateVaga(app: FastifyInstance) {
  app.put("/vagas/:id", async (request, reply) => {
    try {
      const user = await request.jwtVerify<TokenPayload>();

      if (user.perfil !== "EMPRESA" || !user.sub) {
        return reply.status(403).send({
          message: "Apenas empresas podem editar vagas",
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

      const body: Record<string, string> = {};

      for await (const part of request.parts()) {
        if (part.type === "field") {
          body[part.fieldname] = String(part.value);
        }
      }

      const data = updateVagaSchema.parse(body);

      if (Object.keys(data).length === 0) {
        return reply.status(400).send({
          message: "Nenhum dado fornecido para atualização",
        });
      }

      const dataToUpdate: Record<string, string> = {};

      if (data.titulo) dataToUpdate.titulo = data.titulo;
      if (data.descricao) dataToUpdate.descricao = data.descricao;
      if (data.cursoAlvo) dataToUpdate.cursoAlvo = data.cursoAlvo;
      if (data.cidade) dataToUpdate.cidade = data.cidade;
      if (data.informacoesContato) {
        dataToUpdate.informacoesContato = data.informacoesContato;
      }

      const vagaAtualizada = await prisma.vaga.update({
        where: {
          id,
        },
        data: dataToUpdate,
      });

      return reply.status(200).send(vagaAtualizada);
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
