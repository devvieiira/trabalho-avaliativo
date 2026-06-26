"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Save, GraduationCap, Building2 } from "lucide-react";

export default function EditarVagaPage() {
  const params = useParams();
  const router = useRouter();

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    cursoAlvo: "",
    cidade: "",
    informacoesContato: "",
    status: "ABERTA",
  });

  const cursos = [
    "Sistemas para Internet",
    "Administração",
    "Publicidade e Propaganda",
    "Gestão Comercial",
    "Design Gráfico",
    "Contabilidade",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Faça login para acessar esta página.");
      router.replace("/login");
      return;
    }

    carregarVaga(token);
  }, []);

  async function carregarVaga(token: string) {
    try {
      const response = await axios.get(
        `http://localhost:4000/vagas/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFormData({
        titulo: response.data.titulo,
        descricao: response.data.descricao,
        cursoAlvo: response.data.cursoAlvo,
        cidade: response.data.cidade,
        informacoesContato: response.data.informacoesContato,
        status: response.data.status,
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Sessão expirada.");
        router.replace("/login");
        return;
      }

      toast.error("Erro ao carregar vaga.");
    } finally {
      setCarregando(false);
    }
  }

  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;

    setFormData((old) => ({
      ...old,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Faça login novamente.");
      router.replace("/login");
      return;
    }

    setSalvando(true);

    try {
      const form = new FormData();

      form.append("titulo", formData.titulo);
      form.append("descricao", formData.descricao);
      form.append("cursoAlvo", formData.cursoAlvo);
      form.append("cidade", formData.cidade);
      form.append("informacoesContato", formData.informacoesContato);
      form.append("status", formData.status);

      await axios.put(`http://localhost:4000/vagas/${params.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Vaga atualizada com sucesso!");
      router.push("/empresa/vagas");
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Sessão expirada.");
        router.replace("/login");
        return;
      }

      toast.error(error.response?.data?.message ?? "Erro ao atualizar vaga.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold">IFRS Estágios</h1>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-6">
        <Link
          href="/empresa/vagas"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Link>

        <div className="text-center mb-8">
          <Building2 className="mx-auto h-12 w-12 text-blue-600" />

          <h1 className="mt-4 text-3xl font-bold">Editar Vaga</h1>

          <p className="mt-2 text-gray-600">Atualize as informações da vaga.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>

            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Curso</label>

            <select
              name="cursoAlvo"
              value={formData.cursoAlvo}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Selecione</option>

              {cursos.map((curso) => (
                <option key={curso} value={curso}>
                  {curso}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Status da vaga
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            >
              <option value="ABERTA">Aberta</option>
              <option value="PREENCHIDA">Preenchida</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cidade</label>

            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>

            <textarea
              rows={6}
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Informações de Contato
            </label>

            <textarea
              rows={4}
              name="informacoesContato"
              value={formData.informacoesContato}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/empresa/vagas" className="px-5 py-2 border rounded-md">
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={salvando}
              className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {salvando ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
