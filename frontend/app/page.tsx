import Link from "next/link";
import { Search, Briefcase, Users, Building2, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">IFRS Estágios</h1>
            </div>
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

      {/* Hero Section */}
      <main>
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Encontre seu</span>
                    <span className="block text-green-600 xl:inline"> estágio ideal</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Sistema de vagas de estágio curricular obrigatório do IFRS Campus Feliz. 
                    Conectando alunos e empresas para oportunidades de crescimento profissional.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        href="/vagas"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                      >
                        <Search className="mr-2 h-5 w-5" />
                        Explorar Vagas
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        href="/empresa/cadastro"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                      >
                        <Building2 className="mr-2 h-5 w-5" />
                        Cadastrar Empresa
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="h-56 w-full bg-linear-to-r from-green-500 to-green  -600 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
              <Briefcase className="h-32 w-32 text-white opacity-50" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-green-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Conectando talentos com oportunidades
              </h2>
              <p className="mt-3 text-xl text-blue-200 sm:mt-4">
                Facilitamos a conexão entre estudantes e empresas
              </p>
            </div>
            <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                  Vagas Ativas
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">50+</dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                  Empresas Parceiras
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">25+</dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-green-200">
                  Alunos Beneficiados
                </dt>
                <dd className="order-1 text-5xl font-extrabold text-white">200+</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
                Como funciona
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Para cada perfil de usuário
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Para Alunos</p>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Consulte vagas disponíveis, filtre por curso e cidade, e visualize detalhes com seu email institucional.
                  </dd>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Para Empresas</p>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Cadastre vagas, gerencie suas oportunidades e encontre os melhores candidatos.
                  </dd>
                </div>

                <div className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Para Administradores</p>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Gerencie usuários, aprove empresas e monitore todas as atividades do sistema.
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-white mr-2" />
              <p className="text-white text-lg font-semibold">IFRS Campus Feliz</p>
            </div>
            <p className="text-gray-400">
              © 2026 Sistema de Estágios. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
