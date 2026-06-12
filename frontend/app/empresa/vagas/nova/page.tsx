'use client';

import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, Save, GraduationCap, Building2 } from "lucide-react";

export default function NovaVagaPage() {
  const [formData, setFormData] = useState({
    titulo: '',
    curso: '',
    cidade: '',
    salario: '',
    cargaHoraria: '',
    modalidade: 'presencial',
    descricao: '',
    requisitos: '',
    beneficios: '',
    nomeContato: '',
    emailContato: '',
    telefoneContato: '',
    endereco: ''
  });

  const [carregando, setCarregando] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    
    // Simulação de salvamento
    setTimeout(() => {
      alert('Vaga criada com sucesso!');
      setCarregando(false);
      // Redirecionar para lista de vagas
    }, 2000);
  };

  const cursos = [
    "Sistemas para Internet",
    "Administração",
    "Publicidade e Propaganda",
    "Gestão Comercial",
    "Design Gráfico",
    "Contabilidade"
  ];

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
              <Link href="/empresa/vagas" className="text-gray-500 hover:text-gray-900">
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

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link
          href="/empresa/vagas"
          className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para minhas vagas
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <Building2 className="mx-auto h-12 w-12 text-blue-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Nova Vaga de Estágio
          </h1>
          <p className="mt-2 text-gray-600">
            Preencha os dados para publicar uma nova oportunidade de estágio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-8">
          {/* Informações Básicas */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações da Vaga</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                  Título da Vaga *
                </label>
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  required
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Ex: Desenvolvedor Frontend Junior"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="curso" className="block text-sm font-medium text-gray-700">
                  Curso *
                </label>
                <select
                  name="curso"
                  id="curso"
                  required
                  value={formData.curso}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione um curso</option>
                  {cursos.map(curso => (
                    <option key={curso} value={curso}>{curso}</option>
                  ))}
                </select>
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
                  placeholder="Ex: Porto Alegre"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="salario" className="block text-sm font-medium text-gray-700">
                  Bolsa Auxílio (opcional)
                </label>
                <input
                  type="text"
                  name="salario"
                  id="salario"
                  value={formData.salario}
                  onChange={handleInputChange}
                  placeholder="Ex: R$ 1.200,00"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="cargaHoraria" className="block text-sm font-medium text-gray-700">
                  Carga Horária *
                </label>
                <input
                  type="text"
                  name="cargaHoraria"
                  id="cargaHoraria"
                  required
                  value={formData.cargaHoraria}
                  onChange={handleInputChange}
                  placeholder="Ex: 6h/dia ou 30h/semana"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="modalidade" className="block text-sm font-medium text-gray-700">
                  Modalidade *
                </label>
                <select
                  name="modalidade"
                  id="modalidade"
                  required
                  value={formData.modalidade}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="presencial">Presencial</option>
                  <option value="remoto">Remoto</option>
                  <option value="hibrido">Híbrido</option>
                </select>
              </div>
            </div>
          </div>

          {/* Descrição e Detalhes */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrição e Requisitos</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                  Descrição da Vaga *
                </label>
                <textarea
                  name="descricao"
                  id="descricao"
                  required
                  rows={5}
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descreva as principais atividades e responsabilidades do estágio..."
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="requisitos" className="block text-sm font-medium text-gray-700">
                  Requisitos *
                </label>
                <textarea
                  name="requisitos"
                  id="requisitos"
                  required
                  rows={4}
                  value={formData.requisitos}
                  onChange={handleInputChange}
                  placeholder="Liste os requisitos necessários, conhecimentos, habilidades, etc. (um por linha)"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="beneficios" className="block text-sm font-medium text-gray-700">
                  Benefícios (opcional)
                </label>
                <textarea
                  name="beneficios"
                  id="beneficios"
                  rows={3}
                  value={formData.beneficios}
                  onChange={handleInputChange}
                  placeholder="Liste os benefícios oferecidos (um por linha)"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações de Contato</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nomeContato" className="block text-sm font-medium text-gray-700">
                  Nome do Responsável *
                </label>
                <input
                  type="text"
                  name="nomeContato"
                  id="nomeContato"
                  required
                  value={formData.nomeContato}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="emailContato" className="block text-sm font-medium text-gray-700">
                  E-mail de Contato *
                </label>
                <input
                  type="email"
                  name="emailContato"
                  id="emailContato"
                  required
                  value={formData.emailContato}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="telefoneContato" className="block text-sm font-medium text-gray-700">
                  Telefone de Contato *
                </label>
                <input
                  type="tel"
                  name="telefoneContato"
                  id="telefoneContato"
                  required
                  value={formData.telefoneContato}
                  onChange={handleInputChange}
                  placeholder="(51) 3333-4444"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
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
                  placeholder="Rua, número, bairro"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6">
            <Link
              href="/empresa/vagas"
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={carregando}
              className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              {carregando ? 'Salvando...' : 'Publicar Vaga'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
