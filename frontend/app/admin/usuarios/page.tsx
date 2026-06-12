'use client';

import { useState } from 'react';
import Link from "next/link";
import { Search, Filter, GraduationCap, Users, Check, X, Eye, UserCheck, UserX, Building2, User, Mail, Phone, Calendar } from "lucide-react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: 'aluno' | 'empresa' | 'admin';
  status: 'ativo' | 'inativo' | 'pendente';
  dataCadastro: string;
  telefone?: string;
  empresa?: string;
  curso?: string;
  ultimoAcesso?: string;
}

const usuariosExemplo: Usuario[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@feliz.ifrs.edu.br",
    tipo: "aluno",
    status: "ativo",
    dataCadastro: "2026-01-15",
    curso: "Sistemas para Internet",
    ultimoAcesso: "2026-02-13"
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria.santos@feliz.ifrs.edu.br",
    tipo: "aluno",
    status: "ativo",
    dataCadastro: "2026-01-20",
    curso: "Administração",
    ultimoAcesso: "2026-02-12"
  },
  {
    id: 3,
    nome: "TechCorp Ltda",
    email: "contato@techcorp.com.br",
    tipo: "empresa",
    status: "ativo",
    dataCadastro: "2026-01-10",
    telefone: "(51) 3333-4444",
    empresa: "TechCorp Ltda",
    ultimoAcesso: "2026-02-13"
  },
  {
    id: 4,
    nome: "Digital Solutions",
    email: "rh@digitalsolutions.com.br",
    tipo: "empresa",
    status: "pendente",
    dataCadastro: "2026-02-10",
    telefone: "(51) 2222-3333",
    empresa: "Digital Solutions"
  },
  {
    id: 5,
    nome: "Carlos Admin",
    email: "carlos@ifrs.edu.br",
    tipo: "admin",
    status: "ativo",
    dataCadastro: "2025-12-01",
    ultimoAcesso: "2026-02-13"
  },
  {
    id: 6,
    nome: "Ana Costa",
    email: "ana.costa@feliz.ifrs.edu.br",
    tipo: "aluno",
    status: "inativo",
    dataCadastro: "2026-01-25",
    curso: "Design Gráfico",
    ultimoAcesso: "2026-01-30"
  }
];

export default function GestaoUsuariosPage() {
  const [usuarios, setUsuarios] = useState(usuariosExemplo);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'aluno' | 'empresa' | 'admin'>('todos');
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'ativo' | 'inativo' | 'pendente'>('todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const usuariosFiltrados = usuarios.filter(usuario => {
    const textoMatch = usuario.nome.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                     usuario.email.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                     (usuario.empresa && usuario.empresa.toLowerCase().includes(filtroTexto.toLowerCase())) ||
                     (usuario.curso && usuario.curso.toLowerCase().includes(filtroTexto.toLowerCase()));
    
    const tipoMatch = filtroTipo === 'todos' || usuario.tipo === filtroTipo;
    const statusMatch = filtroStatus === 'todos' || usuario.status === filtroStatus;

    return textoMatch && tipoMatch && statusMatch;
  });

  const alterarStatus = (id: number, novoStatus: 'ativo' | 'inativo') => {
    setUsuarios(prev => prev.map(usuario => 
      usuario.id === id ? { ...usuario, status: novoStatus } : usuario
    ));
  };

  const aprovarEmpresa = (id: number) => {
    setUsuarios(prev => prev.map(usuario => 
      usuario.id === id ? { ...usuario, status: 'ativo' } : usuario
    ));
  };

  const rejeitarEmpresa = (id: number) => {
    if (confirm('Tem certeza que deseja rejeitar o cadastro desta empresa?')) {
      setUsuarios(prev => prev.filter(usuario => usuario.id !== id));
    }
  };

  const getStatusBadge = (status: 'ativo' | 'inativo' | 'pendente') => {
    switch (status) {
      case 'ativo':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <UserCheck className="w-3 h-3 mr-1" />
            Ativo
          </span>
        );
      case 'inativo':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <UserX className="w-3 h-3 mr-1" />
            Inativo
          </span>
        );
      case 'pendente':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Calendar className="w-3 h-3 mr-1" />
            Pendente
          </span>
        );
    }
  };

  const getTipoBadge = (tipo: 'aluno' | 'empresa' | 'admin') => {
    switch (tipo) {
      case 'aluno':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
            <GraduationCap className="w-3 h-3 mr-1" />
            Aluno
          </span>
        );
      case 'empresa':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
            <Building2 className="w-3 h-3 mr-1" />
            Empresa
          </span>
        );
      case 'admin':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
            <User className="w-3 h-3 mr-1" />
            Admin
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
              <Link href="/admin/usuarios" className="text-blue-600 font-medium">
                Usuários
              </Link>
              <Link href="/admin/vagas" className="text-gray-500 hover:text-gray-900">
                Vagas
              </Link>
              <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-900">
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestão de Usuários
          </h1>
          <p className="text-gray-600">
            Gerencie alunos, empresas e administradores do sistema
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Alunos</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {usuarios.filter(u => u.tipo === 'aluno').length}
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Empresas</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {usuarios.filter(u => u.tipo === 'empresa').length}
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
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pendentes</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {usuarios.filter(u => u.status === 'pendente').length}
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
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Usuários</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {usuarios.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por nome, email, empresa ou curso..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  Tipo de usuário
                </label>
                <select
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value as 'todos' | 'aluno' | 'empresa' | 'admin')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="todos">Todos os tipos</option>
                  <option value="aluno">Alunos</option>
                  <option value="empresa">Empresas</option>
                  <option value="admin">Administradores</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value as 'todos' | 'ativo' | 'inativo' | 'pendente')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="todos">Todos os status</option>
                  <option value="ativo">Ativos</option>
                  <option value="inativo">Inativos</option>
                  <option value="pendente">Pendentes</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Usuários ({usuariosFiltrados.length})
            </h3>
          </div>
          
          {usuariosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum usuário encontrado</h3>
              <p className="mt-1 text-sm text-gray-500">
                Tente ajustar os filtros para encontrar mais usuários.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usuário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Detalhes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cadastro
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usuariosFiltrados.map((usuario) => (
                    <tr key={usuario.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {usuario.nome}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {usuario.email}
                          </div>
                          {usuario.telefone && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {usuario.telefone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getTipoBadge(usuario.tipo)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(usuario.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {usuario.empresa && (
                          <div className="mb-1">{usuario.empresa}</div>
                        )}
                        {usuario.curso && (
                          <div className="mb-1">Curso: {usuario.curso}</div>
                        )}
                        {usuario.ultimoAcesso && (
                          <div className="text-xs">
                            Último acesso: {new Date(usuario.ultimoAcesso).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          {/* Ações para empresas pendentes */}
                          {usuario.tipo === 'empresa' && usuario.status === 'pendente' && (
                            <>
                              <button
                                onClick={() => aprovarEmpresa(usuario.id)}
                                className="text-green-600 hover:text-green-900 flex items-center"
                                title="Aprovar empresa"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => rejeitarEmpresa(usuario.id)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                                title="Rejeitar empresa"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          
                          {/* Ações de ativação/desativação */}
                          {usuario.tipo !== 'admin' && usuario.status !== 'pendente' && (
                            <>
                              {usuario.status === 'ativo' ? (
                                <button
                                  onClick={() => alterarStatus(usuario.id, 'inativo')}
                                  className="text-red-600 hover:text-red-900"
                                  title="Desativar usuário"
                                >
                                  <UserX className="h-4 w-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => alterarStatus(usuario.id, 'ativo')}
                                  className="text-green-600 hover:text-green-900"
                                  title="Ativar usuário"
                                >
                                  <UserCheck className="h-4 w-4" />
                                </button>
                              )}
                            </>
                          )}
                          
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
