import Link from "next/link";
import { cookies } from "next/headers";
import {
  Search,
  Briefcase,
  Users,
  Building2,
  GraduationCap,
  UserCircle,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";

export default async function Home() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");
  const perfil = cookieStore.get("perfil")?.value;
  const nome = cookieStore.get("nome")?.value;

  const logado = !!token;

  const dashboardLink =
    perfil === "EMPRESA"
      ? "/empresa/dashboard"
      : perfil === "ADMIN"
        ? "/admin/dashboard"
        : "/aluno/dashboard";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">
                IFRS Estágios
              </h1>
            </div>

            <nav className="flex items-center gap-6">
              <Link
                href="/vagas"
                className="text-gray-600 hover:text-green-600 transition"
              >
                Ver Vagas
              </Link>

              {!logado ? (
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-green-600 transition"
                >
                  Entrar
                </Link>
              ) : (
                <details className="relative">
                  <summary className="list-none cursor-pointer">
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 transition">
                      <UserCircle className="h-9 w-9 text-green-600" />

                      <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-900">
                          {nome}
                        </p>

                        <p className="text-xs text-gray-500 capitalize">
                          {perfil?.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </summary>

                  <div className="absolute right-0 mt-2 w-60 rounded-xl border bg-white shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-4 border-b bg-gray-50">
                      <div className="flex items-center gap-3">
                        <UserCircle className="h-10 w-10 text-green-600" />

                        <div>
                          <p className="font-semibold">{nome}</p>
                          <p className="text-sm text-gray-500">{perfil}</p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={dashboardLink}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>

                    <Link
                      href="/perfil"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4" />
                      Editar Perfil
                    </Link>

                    <Link
                      href="/api/auth/logout"
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Link>
                  </div>
                </details>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Encontre seu</span>{" "}
                    <span className="block text-green-600 xl:inline">
                      estágio ideal
                    </span>
                  </h1>

                  <p className="mt-5 text-lg text-gray-500">
                    Sistema de vagas de estágio curricular obrigatório do IFRS
                    Campus Feliz, conectando estudantes e empresas para novas
                    oportunidades profissionais.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/vagas"
                      className="flex items-center px-8 py-3 rounded-md bg-green-600 text-white hover:bg-green-700"
                    >
                      <Search className="mr-2 h-5 w-5" />
                      Explorar Vagas
                    </Link>

                    {!logado && (
                      <Link
                        href="/empresa/cadastro"
                        className="flex items-center px-8 py-3 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        <Building2 className="mr-2 h-5 w-5" />
                        Cadastrar Empresa
                      </Link>
                    )}

                    {logado && (
                      <Link
                        href={dashboardLink}
                        className="flex items-center px-8 py-3 rounded-md bg-gray-800 text-white hover:bg-gray-900"
                      >
                        Ir para meu Dashboard
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="h-56 w-full bg-gradient-to-r from-green-500 to-green-700 sm:h-72 md:h-96 lg:h-full flex items-center justify-center">
              <Briefcase className="h-32 w-32 text-white opacity-50" />
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-green-600">
          <div className="max-w-7xl mx-auto py-16 px-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white">
                Conectando talentos com oportunidades
              </h2>

              <p className="mt-3 text-green-100 text-xl">
                Facilitamos a conexão entre estudantes e empresas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 mt-12 text-center">
              <div>
                <p className="text-5xl font-bold text-white">50+</p>
                <p className="text-green-100 mt-2">Vagas Ativas</p>
              </div>

              <div>
                <p className="text-5xl font-bold text-white">25+</p>
                <p className="text-green-100 mt-2">Empresas Parceiras</p>
              </div>

              <div>
                <p className="text-5xl font-bold text-white">200+</p>
                <p className="text-green-100 mt-2">Alunos Beneficiados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Funcionalidades */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h2 className="text-green-600 uppercase font-semibold">
                Como funciona
              </h2>

              <h3 className="mt-2 text-4xl font-bold">Um sistema para todos</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-10 mt-14">
              <div className="p-6 rounded-xl border hover:shadow-lg transition">
                <GraduationCap className="text-green-600 h-10 w-10 mb-4" />
                <h4 className="font-bold text-xl">Aluno</h4>
                <p className="mt-3 text-gray-600">
                  Consulte vagas, visualize detalhes e mantenha seu perfil
                  atualizado.
                </p>
              </div>

              <div className="p-6 rounded-xl border hover:shadow-lg transition">
                <Building2 className="text-blue-600 h-10 w-10 mb-4" />
                <h4 className="font-bold text-xl">Empresa</h4>
                <p className="mt-3 text-gray-600">
                  Cadastre vagas, edite oportunidades e marque vagas como
                  preenchidas.
                </p>
              </div>

              <div className="p-6 rounded-xl border hover:shadow-lg transition">
                <Users className="text-purple-600 h-10 w-10 mb-4" />
                <h4 className="font-bold text-xl">Administrador</h4>
                <p className="mt-3 text-gray-600">
                  Gerencie usuários, empresas e acompanhe todo o sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-10 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-white mr-2" />
            <p className="text-white font-semibold">IFRS Campus Feliz</p>
          </div>

          <p className="text-gray-400">
            © 2026 Sistema de Estágios. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
