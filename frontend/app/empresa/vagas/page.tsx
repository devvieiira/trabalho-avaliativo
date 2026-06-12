'use client';

import { useState } from 'react';
import Link from "next/link";
import { Plus, Search, Edit3, Trash2, Eye, GraduationCap, Building2, MapPin, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Vaga {
  id: number;
  titulo: string;
  curso: string;
  cidade: string;
  salario?: string;
  cargaHoraria: string;
  dataPublicacao: string;
  status: 'ativa' | 'preenchida' | 'pausada';
  candidatos: number;
}

const vagasEmpresa: Vaga[] = [
  {
    id: 1,
    titulo: "Desenvolvedor Frontend",
    curso: "Sistemas para Internet",
    cidade: "Porto Alegre",
    salario: "R$ 1.200",
    cargaHoraria: "6h/dia",
    dataPublicacao: "2026-02-10",
    status: "ativa",
    candidatos: 8
  },
  {
    id: 2,
    titulo: "Designer UX/UI",
    curso: "Design Gráfico",
    cidade: "Porto Alegre",
    salario: "R$ 1.000",
    cargaHoraria: "4h/dia",
    dataPublicacao: "2026-02-05",
    status: "preenchida",
    candidatos: 12
  },
  {
    id: 3,
    titulo: "Analista de Sistemas",
    curso: "Sistemas para Internet",
    cidade: "Porto Alegre",
    cargaHoraria: "8h/dia",
    dataPublicacao: "2026-01-28",
    status: "pausada",
    candidatos: 3
  }
];

export default function GerenciarVagasPage() {
  const [vagas, setVagas] = useState(vagasEmpresa);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'todas' | 'ativa' | 'preenchida' | 'pausada'>('todas');

  const vagasFiltradas = vagas.filter(vaga => {
    const textoMatch = vaga.titulo.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                     vaga.curso.toLowerCase().includes(filtroTexto.toLowerCase());
    
    const statusMatch = filtroStatus === 'todas' || vaga.status === filtroStatus;

    return textoMatch && statusMatch;
  });

  const alterarStatus = (id: number, novoStatus: 'ativa' | 'preenchida' | 'pausada') => {
    setVagas(prev => prev.map(vaga => 
      vaga.id === id ? { ...vaga, status: novoStatus } : vaga
    ));
  };

  const excluirVaga = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      setVagas(prev => prev.filter(vaga => vaga.id !== id));
    }
  };

  const getStatusBadge = (status: 'ativa' | 'preenchida' | 'pausada') => {
    switch (status) {
      case 'ativa':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Ativa
          </span>
        );
      case 'preenchida':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Preenchida
          </span>
        );
      case 'pausada':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pausada
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">IFRS Estágios</h1>
            </Link>
            <nav className="flex space-x-8">
              <Link href="/empresa/vagas" className="text-blue-600 font-medium">
                Minhas Vagas
              </Link>
              <Link href="/empresa/dashboard" className="text-gray-500 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/login" className="text-gray-500 hover:text-gray-900">
                Sair
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Gerenciar Vagas
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Gerencie suas vagas de estágio publicadas
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Link
              href="/empresa/vagas/nova"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Vaga
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Vagas Ativas</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {vagas.filter(v => v.status === 'ativa').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Preenchidas</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {vagas.filter(v => v.status === 'preenchida').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pausadas</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {vagas.filter(v => v.status === 'pausada').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Candidatos</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {vagas.reduce((total, vaga) => total + vaga.candidatos, 0)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar vagas
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar por título ou curso..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filtroTexto}
                  onChange={(e) => setFiltroTexto(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value as 'todas' | 'ativa' | 'preenchida' | 'pausada')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="todas">Todas as vagas</option>
                <option value="ativa">Ativas</option>
                <option value="preenchida">Preenchidas</option>
                <option value="pausada">Pausadas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vagas List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {vagasFiltradas.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma vaga encontrada</h3>
              <p className="mt-1 text-sm text-gray-500">
                Tente ajustar os filtros ou criar uma nova vaga.
              </p>
              <div className="mt-6">
                <Link
                  href="/empresa/vagas/nova"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Vaga
                </Link>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {vagasFiltradas.map((vaga) => (
                <li key={vaga.id}>
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {vaga.titulo}
                          </h3>
                          {getStatusBadge(vaga.status)}
                        </div>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <GraduationCap className="h-4 w-4 mr-1" />
                            {vaga.curso}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {vaga.cidade}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-sm font-medium">
                            {vaga.candidatos} candidatos
                          </div>
                        </div>
                        {vaga.salario && (
                          <div className="mt-2 text-sm text-green-600 font-medium">
                            {vaga.salario} • {vaga.cargaHoraria}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-6">
                        <Link
                          href={`/vagas/${vaga.id}`}
                          className="text-blue-600 hover:text-blue-500 p-2"
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/empresa/vagas/${vaga.id}/editar`}
                          className="text-gray-600 hover:text-gray-500 p-2"
                          title="Editar"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        
                        {/* Status Actions */}
                        {vaga.status === 'ativa' && (
                          <div className="flex space-x-1">
                            <button
                              onClick={() => alterarStatus(vaga.id, 'preenchida')}
                              className="text-blue-600 hover:text-blue-500 p-2 text-xs"
                              title="Marcar como preenchida"
                            >
                              Preenchida
                            </button>
                            <button
                              onClick={() => alterarStatus(vaga.id, 'pausada')}
                              className="text-yellow-600 hover:text-yellow-500 p-2 text-xs"
                              title="Pausar vaga"
                            >
                              Pausar
                            </button>
                          </div>
                        )}
                        
                        {vaga.status === 'pausada' && (
                          <button
                            onClick={() => alterarStatus(vaga.id, 'ativa')}
                            className="text-green-600 hover:text-green-500 p-2 text-xs"
                            title="Reativar vaga"
                          >
                            Reativar
                          </button>
                        )}
                        
                        {vaga.status === 'preenchida' && (
                          <button
                            onClick={() => alterarStatus(vaga.id, 'ativa')}
                            className="text-green-600 hover:text-green-500 p-2 text-xs"
                            title="Reabrir vaga"
                          >
                            Reabrir
                          </button>
                        )}
                        
                        <button
                          onClick={() => excluirVaga(vaga.id)}
                          className="text-red-600 hover:text-red-500 p-2"
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
