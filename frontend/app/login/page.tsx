"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Mail,
  Lock,
  Building2,
  User,
} from "lucide-react";

// Validação com Zod refletindo os requisitos do backend
const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  senha: z.string().min(1, "A senha é obrigatória"),
});

type LoginFormProps = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState<"aluno" | "empresa" | "admin">(
    "aluno",
  );
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormProps>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  // Verificação de token (opcional, caso você não esteja usando Middleware do Next)
  useEffect(() => {
    // Como os cookies httpOnly não podem ser lidos aqui, esta verificação
    // no lado do cliente só faz sentido se você salvar algo no localStorage também.
    // O ideal no Next.js App Router é fazer esse redirect no middleware.ts
  }, []);

  const handleForm = async (data: LoginFormProps) => {
    try {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("senha", data.senha);

      const response = await axios.post(
        "http://localhost:4000/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Apenas redireciona para a rota que salva o cookie
      router.replace(
        `/api/auth/login?access_token=${encodeURIComponent(
          response.data.token,
        )}`,
      );
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ?? "Email ou senha incorretos.",
        );
      } else {
        toast.error("Erro inesperado.");
      }
    }
  };

  const getPlaceholderEmail = () => {
    switch (tipoUsuario) {
      case "aluno":
        return "joao.silva@feliz.ifrs.edu.br";
      case "empresa":
        return "contato@empresa.com.br";
      case "admin":
        return "admin@ifrs.edu.br";
      default:
        return "seu-email@exemplo.com";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link href="/" className="flex items-center mb-8">
              <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  IFRS Estágios
                </h2>
                <p className="text-sm text-gray-600">Sistema de Estágios</p>
              </div>
            </Link>

            <h2 className="text-3xl font-extrabold text-gray-900">
              Faça login em sua conta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ou{" "}
              <Link
                href="/empresa/cadastro"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                cadastre sua empresa
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {/* User Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipo de usuário
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTipoUsuario("aluno")}
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                    tipoUsuario === "aluno"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <GraduationCap className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">Aluno</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTipoUsuario("empresa")}
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                    tipoUsuario === "empresa"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <Building2 className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">Empresa</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTipoUsuario("admin")}
                  className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                    tipoUsuario === "admin"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <User className="h-6 w-6 mb-1" />
                  <span className="text-xs font-medium">Admin</span>
                </button>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(handleForm)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  E-mail
                  {tipoUsuario === "aluno" && (
                    <span className="text-gray-500"> (institucional)</span>
                  )}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={getPlaceholderEmail()}
                    className={`pl-10 appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="senha"
                    type={mostrarSenha ? "text" : "password"}
                    autoComplete="current-password"
                    className={`pl-10 pr-10 appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.senha ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("senha")}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {mostrarSenha ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.senha && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.senha.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="lembrar-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="lembrar-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Lembrar de mim
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel - Illustration (Mantido igual) */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <GraduationCap className="h-24 w-24 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">
              Bem-vindo ao IFRS Estágios
            </h2>
            <p className="text-lg text-blue-100 max-w-md">
              Conectando estudantes e empresas para oportunidades de crescimento
              profissional
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
