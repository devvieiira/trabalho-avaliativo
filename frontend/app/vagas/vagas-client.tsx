"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Building2,
  GraduationCap,
  Eye,
} from "lucide-react";

interface Vaga {
  id: string;
  titulo: string;
  empresa: string;
  cidade: string;
  cursoAlvo: string;
  descricao: string;
  informacoesContato: string;
  status: string;
  dataPublicacao: string;
}

export default function VagasClient() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);

  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroCurso, setFiltroCurso] = useState("Todos os Cursos");
  const [filtroCidade, setFiltroCidade] = useState("Todas as Cidades");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    async function carregarVagas() {
      try {
        const response = await axios.get("http://localhost:4000/vagas");

        setVagas(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarVagas();
  }, []);

  const vagasFiltradas = vagas.filter((vaga) => {
    const textoMatch =
      vaga.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      vaga.empresa.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      vaga.descricao.toLowerCase().includes(filtroTexto.toLowerCase());

    const cursoMatch =
      filtroCurso === "Todos os Cursos" || vaga.cursoAlvo === filtroCurso;

    const cidadeMatch =
      filtroCidade === "Todas as Cidades" || vaga.cidade === filtroCidade;

    return textoMatch && cursoMatch && cidadeMatch;
  });

  const cursos = [
    "Todos os Cursos",
    ...new Set(vagas.map((vaga) => vaga.cursoAlvo)),
  ];

  const cidades = [
    "Todas as Cidades",
    ...new Set(vagas.map((vaga) => vaga.cidade)),
  ];

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto py-20 text-center">
        <p className="text-lg text-gray-600">Carregando vagas...</p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vagas de Estágio Disponíveis
        </h1>

        <p className="text-gray-600">
          Encontramos {vagasFiltradas.length} vaga
          {vagasFiltradas.length !== 1 ? "s" : ""} disponível
          {vagasFiltradas.length !== 1 ? "eis" : ""} para você
        </p>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder="Buscar por título, empresa ou descrição..."
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-green-500"
              value={filtroTexto}
              onChange={(e) => setFiltroTexto(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
        >
          <Filter className="mr-2 h-5 w-5" />
          {mostrarFiltros ? "Ocultar filtros" : "Mostrar filtros"}
        </button>

        {mostrarFiltros && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Curso
              </label>

              <select
                value={filtroCurso}
                onChange={(e) => setFiltroCurso(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
              >
                {cursos.map((curso) => (
                  <option key={curso}>{curso}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Cidade
              </label>

              <select
                value={filtroCidade}
                onChange={(e) => setFiltroCidade(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
              >
                {cidades.map((cidade) => (
                  <option key={cidade}>{cidade}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Lista */}
      <div className="space-y-6">
        {vagasFiltradas.length === 0 ? (
          <div className="py-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />

            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhuma vaga encontrada
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros para encontrar mais oportunidades.
            </p>
          </div>
        ) : (
          vagasFiltradas.map((vaga) => (
            <div
              key={vaga.id}
              className="rounded-lg bg-white shadow transition-shadow hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      {vaga.titulo}
                    </h3>

                    <div className="mb-3 flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center">
                        <Building2 className="mr-1 h-4 w-4" />
                        {vaga.empresa}
                      </div>

                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {vaga.cidade}
                      </div>

                      <div className="flex items-center">
                        <GraduationCap className="mr-1 h-4 w-4" />
                        {vaga.cursoAlvo}
                      </div>
                    </div>

                    <p className="mb-4 line-clamp-3 text-gray-700">
                      {vaga.descricao}
                    </p>

                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-1 h-4 w-4" />
                      Publicado em{" "}
                      {new Date(vaga.dataPublicacao).toLocaleDateString(
                        "pt-BR",
                      )}
                    </div>
                  </div>

                  <div className="ml-6">
                    <Link
                      href={`/vagas/${vaga.id}`}
                      className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
