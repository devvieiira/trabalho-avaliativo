import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";

import PerfilForm from "./perfil-form";

interface UsuarioResponse {
  id: string;
  email: string;
  perfil: "ALUNO" | "EMPRESA" | "ADMIN";
  nome: string;
  telefone: string | null;
  curso: string | null;
}

export default async function PerfilPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const response = await fetch("http://localhost:4000/usuarios/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/login");
  }

  if (!response.ok) {
    const text = await response.text();
    console.log(text);
    throw new Error(`Erro ${response.status}: ${text}`);
  }

  const data: UsuarioResponse = await response.json();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-green-600" />

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                IFRS Estágios
              </h1>

              <p className="text-sm text-gray-500">Edição do Perfil</p>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-green-600"
          >
            <ArrowLeft size={18} />
            Voltar
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center gap-5">
            <div className="bg-white/20 rounded-full p-5">
              <GraduationCap size={48} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">{data.nome}</h2>

              <p className="text-green-100 mt-1">
                Perfil {data.perfil.toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        <PerfilForm perfil={data.perfil} aluno={data} />
      </main>
    </div>
  );
}
