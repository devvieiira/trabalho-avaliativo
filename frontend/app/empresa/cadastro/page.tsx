'use client';

import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, Building2, GraduationCap, Eye, EyeOff, FileText } from "lucide-react";

export default function CadastroEmpresaPage() {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    cnpj: '',
    razaoSocial: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: 'RS',
    cep: '',
    site: '',
    descricao: '',
    nomeResponsavel: '',
    cargoResponsavel: '',
    emailResponsavel: '',
    telefoneResponsavel: '',
    senha: '',
    confirmarSenha: ''
  });
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    setCarregando(true);
    
    // Simulação de cadastro
    setTimeout(() => {
      alert('Cadastro realizado com sucesso! Aguarde aprovação do administrador.');
      setCarregando(false);
    }, 2000);
  };

  const proximaEtapa = () => {
    setEtapaAtual(2);
  };

  const etapaAnterior = () => {
    setEtapaAtual(1);
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
              <Link href="/vagas" className="text-gray-500 hover:text-gray-900">
                Ver Vagas
              </Link>
              <Link href="/login" className="text-gray-500 hover:text-gray-900">
                Entrar
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/login"
          className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para login
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <Building2 className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Cadastro de Empresa
          </h1>
          <p className="mt-2 text-gray-600">
            Preencha os dados da sua empresa para publicar vagas de estágio
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                etapaAtual >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-300'
              }`}>
                1
              </div>
              <span className={`ml-2 text-sm font-medium ${
                etapaAtual >= 1 ? 'text-gray-900' : 'text-gray-500'
              }`}>
                Dados da Empresa
              </span>
            </div>
            <div className="mx-4 w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                etapaAtual >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 text-gray-300'
              }`}>
                2
              </div>
              <span className={`ml-2 text-sm font-medium ${
                etapaAtual >= 2 ? 'text-gray-900' : 'text-gray-500'
              }`}>
                Responsável & Acesso
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          {etapaAtual === 1 ? (
            <>
              {/* Etapa 1: Dados da Empresa */}
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Dados da Empresa</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="nomeEmpresa" className="block text-sm font-medium text-gray-700">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    name="nomeEmpresa"
                    id="nomeEmpresa"
                    required
                    value={formData.nomeEmpresa}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
                    CNPJ *
                  </label>
                  <input
                    type="text"
                    name="cnpj"
                    id="cnpj"
                    required
                    placeholder="00.000.000/0001-00"
                    value={formData.cnpj}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    id="telefone"
                    required
                    placeholder="(51) 3333-4444"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="site" className="block text-sm font-medium text-gray-700">
                    Site
                  </label>
                  <input
                    type="url"
                    name="site"
                    id="site"
                    placeholder="https://www.empresa.com.br"
                    value={formData.site}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                    Endereço *
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    id="endereco"
                    required
                    value={formData.endereco}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="cidade"
                    id="cidade"
                    required
                    value={formData.cidade}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                    Estado *
                  </label>
                  <select
                    name="estado"
                    id="estado"
                    required
                    value={formData.estado}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="PR">Paraná</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                    Descrição da Empresa
                  </label>
                  <textarea
                    name="descricao"
                    id="descricao"
                    rows={4}
                    value={formData.descricao}
                    onChange={handleInputChange}
                    placeholder="Conte um pouco sobre sua empresa, área de atuação, valores, etc."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={proximaEtapa}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Próximo
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Etapa 2: Responsável & Acesso */}
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Responsável & Acesso</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="nomeResponsavel" className="block text-sm font-medium text-gray-700">
                    Nome do Responsável *
                  </label>
                  <input
                    type="text"
                    name="nomeResponsavel"
                    id="nomeResponsavel"
                    required
                    value={formData.nomeResponsavel}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="cargoResponsavel" className="block text-sm font-medium text-gray-700">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    name="cargoResponsavel"
                    id="cargoResponsavel"
                    required
                    value={formData.cargoResponsavel}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="emailResponsavel" className="block text-sm font-medium text-gray-700">
                    E-mail do Responsável *
                  </label>
                  <input
                    type="email"
                    name="emailResponsavel"
                    id="emailResponsavel"
                    required
                    value={formData.emailResponsavel}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="telefoneResponsavel" className="block text-sm font-medium text-gray-700">
                    Telefone do Responsável *
                  </label>
                  <input
                    type="tel"
                    name="telefoneResponsavel"
                    id="telefoneResponsavel"
                    required
                    value={formData.telefoneResponsavel}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                    Senha *
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={mostrarSenha ? 'text' : 'password'}
                      name="senha"
                      id="senha"
                      required
                      value={formData.senha}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                </div>

                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                    Confirmar Senha *
                  </label>
                  <div className="mt-1 relative">
                    <input
                      type={mostrarConfirmarSenha ? 'text' : 'password'}
                      name="confirmarSenha"
                      id="confirmarSenha"
                      required
                      value={formData.confirmarSenha}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {mostrarConfirmarSenha ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5 mr-3 shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Processo de Aprovação</p>
                    <p>
                      Após o cadastro, sua empresa passará por análise do administrador. 
                      Você receberá um e-mail com o resultado em até 3 dias úteis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={etapaAnterior}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Anterior
                </button>
                <button
                  type="submit"
                  disabled={carregando}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {carregando ? 'Cadastrando...' : 'Finalizar Cadastro'}
                </button>
              </div>
            </>
          )}
        </form>
      </main>
    </div>
  );
}
