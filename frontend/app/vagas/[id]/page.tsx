"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, GraduationCap } from "lucide-react";

interface DetalhesVaga {
  id: string;
  titulo: string;
  descricao: string;
  cursoAlvo: string;
  cidade: string;
  informacoesContato: string;
  status: "ABERTA" | "PREENCHIDA" | "CANCELADA";
  criadoEm: string;
}

export default function DetalhesVagaPage() {
  const params = useParams();

  const [vaga, setVaga] = useState<DetalhesVaga | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarVaga();
  }, []);

  async function carregarVaga() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:4000/vagas/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setVaga(data);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!vaga) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Vaga não encontrada</h1>

          <Link
            href="/empresa/vagas"
            className="text-blue-600 hover:text-blue-700"
          >
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold">IFRS Estágios</h1>
          </Link>

          <nav className="flex space-x-8">
            <Link
              href="/empresa/vagas"
              className="text-gray-600 hover:text-black"
            >
              Minhas vagas
            </Link>

            <Link
              href="/empresa/dashboard"
              className="text-gray-600 hover:text-black"
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-8 px-6">
        <Link
          href="/empresa/vagas"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>

        <div className="bg-white rounded-lg shadow">
          {/* Cabeçalho */}
          <div className="border-b px-8 py-8">
            <h1 className="text-3xl font-bold mb-6">{vaga.titulo}</h1>

            <div className="grid md:grid-cols-3 gap-6 text-gray-600">
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                {vaga.cursoAlvo}
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {vaga.cidade}
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {new Date(vaga.criadoEm).toLocaleDateString("pt-BR")}
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="px-8 py-8 border-b">
            <h2 className="text-xl font-semibold mb-4">Descrição da Vaga</h2>

            <p className="whitespace-pre-line text-gray-700">
              {vaga.descricao}
            </p>
          </div>

          {/* Curso */}
          <div className="px-8 py-8 border-b">
            <h2 className="text-xl font-semibold mb-4">Curso Alvo</h2>

            <p className="text-gray-700">{vaga.cursoAlvo}</p>
          </div>

          {/* Cidade */}
          <div className="px-8 py-8 border-b">
            <h2 className="text-xl font-semibold mb-4">Cidade</h2>

            <p className="text-gray-700">{vaga.cidade}</p>
          </div>

          {/* Contato */}
          <div className="px-8 py-8 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">
              Informações de Contato
            </h2>

            <div className="bg-white rounded-lg border p-5">
              <p className="whitespace-pre-line text-gray-700">
                {vaga.informacoesContato}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
