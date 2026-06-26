import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "@prisma/client";
import { encrypt, hashing } from "../../lib/crypto.js";

const createEmpresaSchema = z.object({
  email: z.email(),
  senha: z.string().min(6),
  razaoSocial: z.string().min(1),
  cnpj: z.string().min(1),
});

export async function createEmpresa(app: FastifyInstance) {
  app.post("/empresas", async (request, reply) => {
    try {
      const body: Record<string, string> = {};

      for await (const part of request.parts()) {
        if (part.type === "field") {
          body[part.fieldname] = String(part.value);
        }
      }

      const data = createEmpresaSchema.parse(body);

      const usuarioExiste = await prisma.usuario.findUnique({
        where: {
          email: data.email,
        },
      });

      if (usuarioExiste) {
        return reply.status(409).send({
          message: "Este email já está em uso",
        });
      }

      const hashSenha = await encrypt(data.senha);

      const usuario = await prisma.usuario.create({
        data: {
          email: data.email,
          senha: hashSenha,
          perfil: "EMPRESA",
          empresa: {
            create: {
              razaoSocial: data.razaoSocial,
              cnpj: data.cnpj,
              statusCadastro: "PENDENTE",
            },
          },
        },
        include: {
          empresa: true,
        },
      });

      return reply.status(201).send(usuario);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: error.flatten().fieldErrors,
        });
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return reply.status(409).send({
          message: "Email ou CNPJ já está em uso",
        });
      }

      console.error(error);

      return reply.status(500).send({
        message: "Internal Server Error",
      });
    }
  });
}
