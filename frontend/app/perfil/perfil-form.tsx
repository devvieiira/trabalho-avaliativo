"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { User, Mail, Phone, BookOpen, Save, Pencil } from "lucide-react";

const schema = z.object({
  nome: z.string().min(1, "Informe o nome."),
  email: z.string().email("E-mail inválido."),
});

type FormData = z.infer<typeof schema>;

interface PerfilFormProps {
  perfil: "ALUNO" | "EMPRESA" | "ADMIN";
  aluno: {
    id: string;
    nome: string;
    email: string;
    curso: string | null;
    telefone: string | null;
  };
}

export default function PerfilForm({ perfil, aluno }: PerfilFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [editNome, setEditNome] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: aluno.nome,
      email: aluno.email,
    },
  });

  async function onSubmit(data: FormData) {
    setLoading(true);

    try {
      const formData = new FormData();

      if (data.nome !== aluno.nome) {
        formData.append("nome", data.nome);
      }

      if (data.email !== aluno.email) {
        formData.append("email", data.email);
      }

      if ([...formData.keys()].length === 0) {
        toast.info("Nenhuma alteração foi realizada.");
        return;
      }

      await axios.patch("/api/perfil", formData);

      toast.success("Perfil atualizado com sucesso!");

      setEditNome(false);
      setEditEmail(false);

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível atualizar o perfil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-8">
        Informações pessoais
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Nome */}
          <div>
            <label className="text-sm font-medium text-gray-700">Nome</label>

            <div className="mt-2 relative">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

              <input
                {...register("nome")}
                disabled={!editNome}
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 disabled:bg-gray-100 disabled:text-gray-500"
              />

              <button
                type="button"
                onClick={() => setEditNome(true)}
                className="absolute right-3 top-3 text-gray-500 hover:text-green-600"
              >
                <Pencil size={18} />
              </button>
            </div>

            {errors.nome && (
              <p className="mt-1 text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">E-mail</label>

            <div className="mt-2 relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

              <input
                {...register("email")}
                disabled={!editEmail}
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200 disabled:bg-gray-100 disabled:text-gray-500"
              />

              <button
                type="button"
                onClick={() => setEditEmail(true)}
                className="absolute right-3 top-3 text-gray-500 hover:text-green-600"
              >
                <Pencil size={18} />
              </button>
            </div>

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {perfil === "ALUNO" && (
            <>
              {/* Curso */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Curso
                </label>

                <div className="mt-2 relative">
                  <BookOpen className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

                  <input
                    value={aluno.curso ?? ""}
                    disabled
                    className="w-full rounded-xl border border-gray-300 bg-gray-100 py-3 pl-12 pr-4 text-gray-500"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  O curso não pode ser alterado.
                </p>
              </div>

              {/* Telefone */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Telefone
                </label>

                <div className="mt-2 relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

                  <input
                    value={aluno.telefone ?? ""}
                    disabled
                    className="w-full rounded-xl border border-gray-300 bg-gray-100 py-3 pl-12 pr-4 text-gray-500"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  O telefone não pode ser alterado.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-4 border-t pt-6">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="rounded-xl border border-gray-300 px-6 py-3 hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-white shadow transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
