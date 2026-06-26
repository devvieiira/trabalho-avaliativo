"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CadastroEmpresaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    razaoSocial: "",
    cnpj: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      setCarregando(true);

      const body = new FormData();

      body.append("razaoSocial", formData.razaoSocial);
      body.append("cnpj", formData.cnpj);
      body.append("email", formData.email);
      body.append("senha", formData.senha);

      const response = await fetch("http://localhost:4000/empresas", {
        method: "POST",
        body: body,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      router.push("/login");
    } catch (error: any) {
      alert(error?.response?.data?.message ?? "Erro ao realizar cadastro.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-xl mx-auto py-10 px-4">
        <Link
          href="/login"
          className="inline-flex items-center text-blue-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>

        <div className="bg-white rounded-xl shadow p-8">
          <div className="text-center mb-8">
            <Building2 className="mx-auto h-12 w-12 text-blue-600" />

            <h1 className="mt-4 text-3xl font-bold">Cadastro de Empresa</h1>

            <p className="text-gray-500 mt-2">
              Cadastre sua empresa para publicar vagas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium">Razão Social</label>

              <input
                name="razaoSocial"
                required
                value={formData.razaoSocial}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">CNPJ</label>

              <input
                name="cnpj"
                required
                value={formData.cnpj}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Senha</label>

              <div className="relative mt-1">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  required
                  value={formData.senha}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border px-3 py-2 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-3"
                >
                  {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Confirmar Senha
              </label>

              <div className="relative mt-1">
                <input
                  type={mostrarConfirmarSenha ? "text" : "password"}
                  name="confirmarSenha"
                  required
                  value={formData.confirmarSenha}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border px-3 py-2 pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                  }
                  className="absolute right-3 top-3"
                >
                  {mostrarConfirmarSenha ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={carregando}
              className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {carregando ? "Cadastrando..." : "Cadastrar Empresa"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
