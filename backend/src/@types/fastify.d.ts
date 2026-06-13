import "@fastify/jwt";

declare module "fastify" {
  export interface FastifyInstance {
    // Isso garante que o TypeScript saiba que o JWT existe em qualquer lugar do projeto
    jwt: import("@fastify/jwt").JWT;
  }
}
