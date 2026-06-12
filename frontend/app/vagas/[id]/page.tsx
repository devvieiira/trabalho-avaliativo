'use client';

import { useState, use } from 'react';
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Building2, GraduationCap, Clock, DollarSign, Mail, Phone, User, AlertCircle } from "lucide-react";

interface DetalhesVaga {
  id: number;
  titulo: string;
  empresa: string;
  cidade: string;
  curso: string;
  descricao: string;
  descricaoCompleta: string;
  requisitos: string[];
  beneficios: string[];
  dataPublicacao: string;
  salario?: string;
  cargaHoraria: string;
  contato: {
    nome: string;
    email: string;
    telefone: string;
  };
  endereco: string;
  modalidade: string;
}

// Simulação de dados da vaga
const obterDetalhesVaga = (id: string): DetalhesVaga | null => {
  const vagas: { [key: string]: DetalhesVaga } = {
    '1': {
      id: 1,
      titulo: "Desenvolvedor Frontend",
      empresa: "TechCorp Ltda",
      cidade: "Porto Alegre",
      curso: "Sistemas para Internet",
      descricao: "Desenvolvimento de interfaces web modernas usando React e TypeScript",
      descricaoCompleta: `Estamos procurando um estagiário para integrar nossa equipe de desenvolvimento frontend. 
      
      O candidato terá a oportunidade de trabalhar em projetos reais, desenvolvendo interfaces web modernas e responsivas utilizando as mais recentes tecnologias do mercado.
      
      Esta é uma excelente oportunidade para quem deseja iniciar sua carreira em desenvolvimento web e fazer parte de uma equipe dinâmica e inovadora.`,
      requisitos: [
        "Cursando Sistemas para Internet ou áreas afins",
        "Conhecimentos básicos em HTML, CSS e JavaScript",
        "Conhecimento em React (diferencial)",
        "Conhecimento em TypeScript (diferencial)",
        "Boa comunicação e trabalho em equipe",
        "Proatividade e vontade de aprender"
      ],
      beneficios: [
        "Auxílio alimentação",
        "Vale transporte",
        "Ambiente de trabalho colaborativo",
        "Oportunidade de crescimento",
        "Treinamentos e capacitações",
        "Horário flexível"
      ],
      dataPublicacao: "2026-02-10",
      salario: "R$ 1.200",
      cargaHoraria: "6h/dia",
      contato: {
        nome: "Maria Silva",
        email: "rh@techcorp.com.br",
        telefone: "(51) 3333-4444"
      },
      endereco: "Av. Ipiranga, 1234 - Centro, Porto Alegre/RS",
      modalidade: "Presencial"
    },
    '2': {
      id: 2,
      titulo: "Analista de Marketing Digital",
      empresa: "Digital Solutions",
      cidade: "Feliz",
      curso: "Publicidade e Propaganda",
      descricao: "Gestão de campanhas digitais e análise de métricas",
      descricaoCompleta: `Oportunidade de estágio na área de marketing digital em uma agência em crescimento.
      
      O estagiário irá auxiliar na criação e gestão de campanhas digitais, análise de métricas e relatórios, além de apoiar na criação de conteúdo para redes sociais.
      
      Buscamos alguém criativo, analítico e que esteja sempre atualizado com as tendências do marketing digital.`,
      requisitos: [
        "Cursando Publicidade e Propaganda ou Marketing",
        "Conhecimentos básicos em redes sociais",
        "Excel intermediário",
        "Google Analytics (diferencial)",
        "Criatividade e organização",
        "Boa redação"
      ],
      beneficios: [
        "Auxílio alimentação",
        "Vale transporte",
        "Certificações gratuitas",
        "Networking com profissionais da área",
        "Projetos diversificados"
      ],
      dataPublicacao: "2026-02-08",
      salario: "R$ 1.000",
      cargaHoraria: "4h/dia",
      contato: {
        nome: "João Santos",
        email: "contato@digitalsolutions.com.br",
        telefone: "(51) 2222-3333"
      },
      endereco: "Rua das Flores, 567 - Centro, Feliz/RS",
      modalidade: "Híbrido"
    }
  };

  return vagas[id] || null;
};

export default function DetalhesVagaPage({ params }: { params: Promise<{ id: string }> }) {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const { id } = use(params);
  const vaga = obterDetalhesVaga(id);

  if (!vaga) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vaga não encontrada</h1>
          <Link href="/vagas" className="text-blue-600 hover:text-blue-500">
            Voltar para lista de vagas
          </Link>
        </div>
      </div>
    );
  }

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

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/vagas"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para vagas
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Header */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {vaga.titulo}
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    {vaga.empresa}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {vaga.cidade}
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    {vaga.curso}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
              <div className="text-right">
                {vaga.salario && (
                  <div className="flex items-center text-lg font-semibold text-green-600 mb-1">
                    <DollarSign className="h-5 w-5 mr-1" />
                    {vaga.salario}
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {vaga.cargaHoraria}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {vaga.modalidade}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="px-6 py-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrição da Vaga</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {vaga.descricaoCompleta}
            </div>
          </div>

          {/* Requirements */}
          <div className="px-6 py-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h2>
            <ul className="space-y-2">
              {vaga.requisitos.map((requisito, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 shrink-0" />
                  <span className="text-gray-700">{requisito}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="px-6 py-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefícios</h2>
            <ul className="space-y-2">
              {vaga.beneficios.map((beneficio, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 bg-green-600 rounded-full mt-2 mr-3 shrink-0" />
                  <span className="text-gray-700">{beneficio}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="px-6 py-6 border-t border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações de Contato</h2>
            
            {!usuarioLogado ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <p className="text-yellow-800 font-medium">
                      Faça login para visualizar as informações de contato
                    </p>
                    <p className="text-yellow-700 text-sm mt-1">
                      É necessário estar logado com seu email institucional para acessar os dados de contato da empresa.
                    </p>
                    <Link
                      href="/login"
                      className="inline-block mt-3 px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      Fazer Login
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Dados para Contato</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{vaga.contato.nome}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <a href={`mailto:${vaga.contato.email}`} className="text-blue-600 hover:text-blue-500">
                        {vaga.contato.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-700">{vaga.contato.telefone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Endereço</h3>
                  <p className="text-gray-700">{vaga.endereco}</p>
                </div>
              </div>
            )}
          </div>

          {/* Demo Login Button */}
          {!usuarioLogado && (
            <div className="px-6 py-4 border-t border-gray-200 bg-blue-50">
              <p className="text-blue-800 text-sm mb-2">
                <strong>Demo:</strong> Clique no botão abaixo para simular o login e visualizar as informações de contato:
              </p>
              <button
                onClick={() => setUsuarioLogado(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Simular Login
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
