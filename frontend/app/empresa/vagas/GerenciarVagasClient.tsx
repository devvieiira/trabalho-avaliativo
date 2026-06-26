"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  GraduationCap,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface Vaga {
  id: string;
  titulo: string;
  cursoAlvo: string;
  cidade: string;
  descricao: string;
  informacoesContato: string;
  status: "ABERTA" | "PREENCHIDA" | "CANCELADA";
  criadoEm: string;
}

export default function GerenciarVagasClient() {
  const router = useRouter();

  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<
    "todas" | "ativa" | "preenchida" | "pausada"
  >("todas");

  useEffect(() => {
    carregarVagas();
  }, []);

  async function carregarVagas() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:4000/vagas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setVagas(data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar vagas.");
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout");

      localStorage.removeItem("token");
      localStorage.removeItem("perfil");

      toast.success("Logout realizado com sucesso!");

      router.replace("/login");
      router.refresh();
    } catch {
      toast.error("Erro ao realizar logout.");
    }
  }

  async function excluirVaga(id: string) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta vaga?",
    );

    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:4000/vagas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Vaga excluída com sucesso!");

      setVagas((old) => old.filter((vaga) => vaga.id !== id));
    } catch (error: any) {
      toast.error(error.message ?? "Erro ao excluir vaga.");
    }
  }

  const vagasFiltradas = vagas.filter((vaga) => {
    const textoMatch =
      vaga.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      vaga.cursoAlvo.toLowerCase().includes(filtroTexto.toLowerCase());

    const statusMatch =
      filtroStatus === "todas" ||
      (filtroStatus === "ativa" && vaga.status === "ABERTA") ||
      (filtroStatus === "preenchida" && vaga.status === "PREENCHIDA") ||
      (filtroStatus === "pausada" && vaga.status === "CANCELADA");

    return textoMatch && statusMatch;
  });

  function getStatusBadge(status: "ABERTA" | "PREENCHIDA" | "CANCELADA") {
    switch (status) {
      case "ABERTA":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Ativa
          </span>
        );

      case "PREENCHIDA":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Preenchida
          </span>
        );

      case "CANCELADA":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Cancelada
          </span>
        );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">
                IFRS Estágios
              </h1>
            </Link>

            <nav className="flex items-center gap-8">
              <Link href="/empresa/vagas" className="text-blue-600 font-medium">
                Minhas Vagas
              </Link>

              <button
                onClick={logout}
                className="text-gray-500 hover:text-red-600 transition"
              >
                Sair
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Gerenciar Vagas</h1>

            <p className="text-gray-500">Gerencie suas vagas publicadas</p>
          </div>

          <Link
            href="/empresa/vagas/nova"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Vaga
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Vagas Ativas</p>
            <p className="text-2xl font-bold">
              {vagas.filter((v) => v.status === "ABERTA").length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Preenchidas</p>
            <p className="text-2xl font-bold">
              {vagas.filter((v) => v.status === "PREENCHIDA").length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <p className="text-gray-500">Canceladas</p>
            <p className="text-2xl font-bold">
              {vagas.filter((v) => v.status === "CANCELADA").length}
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Buscar</label>

              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />

                <input
                  className="w-full pl-10 border rounded-lg p-2"
                  placeholder="Buscar vaga..."
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Status</label>

              <select
                value={filtroStatus}
                onChange={(e) =>
                  setFiltroStatus(
                    e.target.value as
                      | "todas"
                      | "ativa"
                      | "preenchida"
                      | "pausada",
                  )
                }
                className="w-full border rounded-lg p-2"
              >
                <option value="todas">Todas</option>
                <option value="ativa">Ativas</option>
                <option value="preenchida">Preenchidas</option>
                <option value="pausada">Canceladas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista */}
        <div className="bg-white rounded-lg shadow">
          {vagasFiltradas.length === 0 ? (
            <div className="text-center py-10">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />

              <p className="mt-3">Nenhuma vaga encontrada.</p>
            </div>
          ) : (
            <ul className="divide-y">
              {vagasFiltradas.map((vaga) => (
                <li key={vaga.id} className="p-6">
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">{vaga.titulo}</h2>

                        {getStatusBadge(vaga.status)}
                      </div>

                      <div className="grid md:grid-cols-3 gap-3 mt-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-1" />
                          {vaga.cursoAlvo}
                        </div>

                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {vaga.cidade}
                        </div>

                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(vaga.criadoEm).toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-6">
                      <Link
                        href={`/vagas/${vaga.id}`}
                        className="text-blue-600"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        href={`/empresa/vagas/${vaga.id}/editar`}
                        className="text-gray-600"
                      >
                        <Edit3 size={18} />
                      </Link>

                      <button
                        onClick={() => excluirVaga(vaga.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Excluir vaga"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
