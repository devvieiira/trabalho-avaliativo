import Link from "next/link";
import { cookies } from "next/headers";
import { UserCircle, LayoutDashboard, Settings, LogOut } from "lucide-react";

export default async function Navbar() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const nome = cookieStore.get("nome")?.value;
  const perfil = cookieStore.get("perfil")?.value;

  const logado = !!token;

  let dashboardLink = "/";

  switch (perfil) {
    case "ALUNO":
      dashboardLink = "/dashboard/aluno";
      break;
    case "EMPRESA":
      dashboardLink = "/dashboard/empresa";
      break;
    case "ADMIN":
      dashboardLink = "/dashboard/admin";
      break;
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">IFRS Estágios</h1>
          </Link>

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
  );
}
