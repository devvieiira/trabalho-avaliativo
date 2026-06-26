import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma.js";
import { decrypt } from "../../lib/crypto.js";

export async function meRoute(app: FastifyInstance) {
  app.get("/usuarios/me", async (request, reply) => {
    try {
      const payload = await request.jwtVerify<{
        sub: string;
      }>();

      const usuario = await prisma.usuario.findUnique({
        where: {
          id: payload.sub,
        },
        include: {
          aluno: true,
          empresa: true,
          admin: true,
        },
      });

      if (!usuario) {
        return reply.status(404).send({
          message: "Usuário não encontrado.",
        });
      }

      let nome = "";

      if (usuario.aluno) {
        nome = await decrypt(usuario.aluno.nome);
      } else if (usuario.empresa) {
        nome = usuario.empresa.razaoSocial;
      } else if (usuario.admin) {
        nome = usuario.admin.nome;
      }

      return {
        id: usuario.id,
        email: usuario.email,
        perfil: usuario.perfil,
        nome,

        aluno: usuario.aluno
          ? {
              ...usuario.aluno,
              nome,
            }
          : null,

        empresa: usuario.empresa,
        admin: usuario.admin,
      };
    } catch {
      return reply.status(401).send({
        message: "Token inválido.",
      });
    }
  });
}
