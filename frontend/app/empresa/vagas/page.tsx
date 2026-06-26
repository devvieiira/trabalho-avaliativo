import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import GerenciarVagasClient from "./GerenciarVagasClient";

export default async function GerenciarVagasPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const perfil = cookieStore.get("perfil")?.value;

  if (!token) {
    redirect("/login");
  }

  if (perfil === "ALUNO") {
    redirect("/");
  }

  return <GerenciarVagasClient />;
}
