import type { FastifyInstance, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";

type TokenPayload = {
  sub?: string;
  perfil?: string;
  email?: string;
};

const paramsSchema = z.object({
  id: z.string().min(1),
});

const updateUsuarioAtivoSchema = z.object({
  ativo: z.boolean(),
});

const updateEmpresaAprovacaoSchema = z.object({
  statusCadastro: z.enum(["APROVADA", "REPROVADA"]),
});

function isJwtError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    error.statusCode === 401
  );
}

async function readRequestBody(request: FastifyRequest) {
  if (request.isMultipart()) {
    const body: Record<string, unknown> = {};

    for await (const part of request.parts()) {
      if (part.type === "field") {
        body[part.fieldname] = part.value;
      }
    }

    return body;
  }

  return request.body ?? {};
}

export async function adminRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request, reply) => {
    try {
      const user = await request.jwtVerify<TokenPayload>();

      if (user.perfil !== "ADMIN") {
        return reply.status(403).send({
          message: "Acesso permitido apenas para administradores",
        });
      }
    } catch (error) {
      if (isJwtError(error)) {
        return reply.status(401).send({
          message: "Token ausente ou inválido",
        });
      }

      throw error;
    }
  });

  app.patch("/usuarios/:id/ativo", async (request, reply) => {
    try {
      const { id } = paramsSchema.parse(request.params);
      const data = updateUsuarioAtivoSchema.parse(
        await readRequestBody(request),
      );

      const usuario = await prisma.usuario.update({
        where: {
          id,
        },
        data: {
          ativo: data.ativo,
        },
        select: {
          id: true,
          email: true,
          perfil: true,
          ativo: true,
          criadoEm: true,
        },
      });

      return reply.status(200).send({
        message: "Status do usuário atualizado com sucesso",
        data: usuario,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: error.flatten().fieldErrors,
        });
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return reply.status(404).send({
          message: "Usuário não encontrado",
        });
      }

      console.error(error);

      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });

  app.patch("/empresas/:id/aprovacao", async (request, reply) => {
    try {
      const { id } = paramsSchema.parse(request.params);
      const data = updateEmpresaAprovacaoSchema.parse(
        await readRequestBody(request),
      );

      const empresa = await prisma.empresa.update({
        where: {
          id,
        },
        data: {
          statusCadastro: data.statusCadastro,
        },
        include: {
          usuario: {
            select: {
              id: true,
              email: true,
              perfil: true,
              ativo: true,
              criadoEm: true,
            },
          },
        },
      });

      return reply.status(200).send({
        message: "Status da empresa atualizado com sucesso",
        data: empresa,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: error.flatten().fieldErrors,
        });
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return reply.status(404).send({
          message: "Empresa não encontrada",
        });
      }

      console.error(error);

      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });

  app.get("/admin/vagas", async (_request, reply) => {
    try {
      const vagas = await prisma.vaga.findMany({
        orderBy: {
          criadoEm: "desc",
        },
        include: {
          empresa: {
            include: {
              usuario: {
                select: {
                  id: true,
                  email: true,
                  perfil: true,
                  ativo: true,
                  criadoEm: true,
                },
              },
            },
          },
        },
      });

      return reply.status(200).send({
        data: vagas,
      });
    } catch (error) {
      console.error(error);

      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });
}
