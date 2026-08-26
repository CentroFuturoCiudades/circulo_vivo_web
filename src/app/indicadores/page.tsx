import { NavBar } from "@/components/molecules/NavBar";
import { Footer } from "@/components/molecules/Footer";
import { IndicadoresTabs } from "@/components/organisms/IndicadoresTabs";
import { getIndicadores } from "@/lib/data/indicadores";

const NAV_LINKS = [
  { label: "Inicio",      href: "/" },
  { label: "Equipo",      href: "/equipo" },
  { label: "Mapa",        href: "/mapa" },
  { label: "Chatbot",     href: "/chatbot" },
  { label: "Indicadores", href: "/indicadores", active: true },
];

export default async function IndicadoresPage() {
  const result = await getIndicadores();

  return (
    <div className="relative min-h-screen bg-[#F4F1EA]">
      <div className="px-6 md:px-9 pt-5">
        <NavBar
          links={NAV_LINKS}
          bgColor="#708B8D"
          bgOpacity={20}
          logoColor="#708B8D"
          pillBgColor="#ffffff"
          pillBgOpacity={50}
        />
      </div>

      <main className="px-6 md:px-9 pt-10 pb-8">
        <IndicadoresTabs dashboardResult={result} />
      </main>

      <Footer />
    </div>
  );
}
