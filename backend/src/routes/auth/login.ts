import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { compareHash } from "../../lib/crypto.js";

const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  senha: z.string().min(1, "A senha é obrigatória"),
});

export async function loginRoute(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    try {
      const body: Record<string, string> = {};

      for await (const part of request.parts()) {
        if (part.type === "field") {
          body[part.fieldname] = String(part.value);
        }
      }

      const data = loginSchema.parse(body);

      const usuario = await prisma.usuario.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!usuario) {
        return reply.status(401).send({
          message: "Credenciais inválidas.",
        });
      }

      if (!usuario.ativo) {
        return reply.status(403).send({
          message:
            "Sua conta foi desativada. Entre em contato com a administração.",
        });
      }

      const senhaValida = await compareHash(data.senha, usuario.senha);

      if (!senhaValida) {
        return reply.status(401).send({
          message: "Credenciais inválidas.",
        });
      }

      const token = app.jwt.sign(
        {
          sub: usuario.id,
          perfil: usuario.perfil,
          email: usuario.email,
        },
        {
          expiresIn: "7d",
        },
      );

      return reply.status(200).send({
        token,
        usuario: {
          id: usuario.id,
          email: usuario.email,
          perfil: usuario.perfil,
        },
      });
    } catch (error) {
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
