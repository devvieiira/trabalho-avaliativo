'use client';

import { useState } from 'react';
import Link from "next/link";
import { Search, Filter, MapPin, Calendar, Building2, GraduationCap, Eye } from "lucide-react";

interface Vaga {
  id: number;
  titulo: string;
  empresa: string;
  cidade: string;
  curso: string;
  descricao: string;
  dataPublicacao: string;
  salario?: string;
  cargaHoraria: string;
}

const vagasExemplo: Vaga[] = [
  {
    id: 1,
    titulo: "Desenvolvedor Frontend",
    empresa: "TechCorp Ltda",
    cidade: "Porto Alegre",
    curso: "Sistemas para Internet",
    descricao: "Desenvolvimento de interfaces web modernas usando React e TypeScript",
    dataPublicacao: "2026-02-10",
    salario: "R$ 1.200",
    cargaHoraria: "6h/dia"
  },
  {
    id: 2,
    titulo: "Analista de Marketing Digital",
    empresa: "Digital Solutions",
    cidade: "Feliz",
    curso: "Publicidade e Propaganda",
    descricao: "Gestão de campanhas digitais e análise de métricas",
    dataPublicacao: "2026-02-08",
    salario: "R$ 1.000",
    cargaHoraria: "4h/dia"
  },
  {
    id: 3,
    titulo: "Assistente Administrativo",
    empresa: "Escritório & Cia",
    cidade: "Bento Gonçalves",
    curso: "Administração",
    descricao: "Apoio administrativo geral e atendimento ao cliente",
    dataPublicacao: "2026-02-12",
    salario: "R$ 800",
    cargaHoraria: "6h/dia"
  },
  {
    id: 4,
    titulo: "Suporte Técnico",
    empresa: "InfoTech",
    cidade: "Caxias do Sul",
    curso: "Sistemas para Internet",
    descricao: "Suporte técnico de primeiro nível para sistemas web",
    dataPublicacao: "2026-02-05",
    cargaHoraria: "8h/dia"
  }
];

const cursos = [
  "Todos os Cursos",
  "Sistemas para Internet",
  "Administração",
  "Publicidade e Propaganda",
  "Gestão Comercial"
];

const cidades = [
  "Todas as Cidades",
  "Porto Alegre",
  "Feliz",
  "Bento Gonçalves",
  "Caxias do Sul",
  "Farroupilha"
];

export default function VagasPage() {
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroCurso, setFiltroCurso] = useState('Todos os Cursos');
  const [filtroCidade, setFiltroCidade] = useState('Todas as Cidades');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const vagasFiltradas = vagasExemplo.filter(vaga => {
    const textoMatch = vaga.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                     vaga.empresa.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                     vaga.descricao.toLowerCase().includes(filtroTexto.toLowerCase());
    
    const cursoMatch = filtroCurso === 'Todos os Cursos' || vaga.curso === filtroCurso;
    const cidadeMatch = filtroCidade === 'Todas as Cidades' || vaga.cidade === filtroCidade;

    return textoMatch && cursoMatch && cidadeMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">IFRS Estágios</h1>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/vagas" className="text-blue-600 font-medium">
                Ver Vagas
              </Link>
              <Link href="/login" className="text-gray-500 hover:text-gray-900">
                Entrar
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vagas de Estágio Disponíveis
          </h1>
          <p className="text-gray-600">
            Encontramos {vagasFiltradas.length} vaga{vagasFiltradas.length !== 1 ? 's' : ''} disponível
            {vagasFiltradas.length !== 1 ? 'eis' : ''} para você
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por título, empresa ou descrição..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <Filter className="h-5 w-5 mr-2" />
            {mostrarFiltros ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>

          {/* Filters */}
          {mostrarFiltros && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Curso
                </label>
                <select
                  value={filtroCurso}
                  onChange={(e) => setFiltroCurso(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {cursos.map(curso => (
                    <option key={curso} value={curso}>{curso}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <select
                  value={filtroCidade}
                  onChange={(e) => setFiltroCidade(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {cidades.map(cidade => (
                    <option key={cidade} value={cidade}>{cidade}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          {vagasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma vaga encontrada</h3>
              <p className="mt-1 text-sm text-gray-500">
                Tente ajustar os filtros para encontrar mais oportunidades.
              </p>
            </div>
          ) : (
            vagasFiltradas.map(vaga => (
              <div key={vaga.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {vaga.titulo}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Building2 className="h-4 w-4 mr-1" />
                        <span className="mr-4">{vaga.empresa}</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="mr-4">{vaga.cidade}</span>
                        <GraduationCap className="h-4 w-4 mr-1" />
                        <span>{vaga.curso}</span>
                      </div>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {vaga.descricao}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Publicado em {new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}
                        </div>
                        {vaga.salario && (
                          <span className="text-green-600 font-medium">
                            {vaga.salario}
                          </span>
                        )}
                        <span>{vaga.cargaHoraria}</span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <Link
                        href={`/vagas/${vaga.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Eye className="h-4 w-4 mr-2" />
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
    </div>
  );
}
