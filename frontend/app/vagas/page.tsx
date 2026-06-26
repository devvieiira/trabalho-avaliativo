import Navbar from "@/components/Navbar";
import VagasClient from "./vagas-client";

export default function VagasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <VagasClient />
    </div>
  );
}
