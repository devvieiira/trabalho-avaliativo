"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    // Remove o token salvo no navegador
    localStorage.removeItem("token");

    // Remove os cookies no servidor
    await fetch("/api/auth/logout");

    // Redireciona para a tela de login
    router.replace("/login");

    // Atualiza os componentes server (Navbar)
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
    >
      <LogOut className="h-4 w-4" />
      Sair
    </button>
  );
}
