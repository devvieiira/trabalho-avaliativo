import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma.js";
import { compareHash, decrypt } from "../../lib/crypto.js";

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

      console.log(data.email);

      const usuario = await prisma.usuario.findUnique({
        where: {
          email: data.email,
        },
        include: {
          aluno: true,
          empresa: true,
          admin: true,
        },
      });

      console.log(usuario);

      if (!usuario) {
        return reply.status(401).send({
          message: "Credenciais inválidas.",
        });
      }

      console.log("chega 1");

      if (!usuario.ativo) {
        return reply.status(403).send({
          message:
            "Sua conta foi desativada. Entre em contato com a administração.",
        });
      }

      console.log(usuario.senha);

      const senhaValida = data.senha === (await decrypt(usuario.senha));

      console.log(senhaValida);

      if (!senhaValida) {
        return reply.status(401).send({
          message: "Credenciais inválidas. (senha)",
        });
      }

      let nome: string | null = null;

      if (usuario.aluno) {
        nome = await decrypt(usuario.aluno.nome);
      }

      if (usuario.empresa) {
        nome = usuario.empresa.razaoSocial;
      }

      if (usuario.admin) {
        nome = usuario.admin.nome;
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
          nome,
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
