import { NavBar } from "@/components/molecules/NavBar";
import { Footer } from "@/components/molecules/Footer";
import { DataUnavailableMessage } from "@/components/molecules/DataUnavailableMessage";
import { IndicadoresDashboard } from "@/components/organisms/IndicadoresDashboard";
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
      {/* Gradient hero — same treatment as /mapa, sized for a header instead of full-viewport */}
      <div
        className="relative pointer-events-none select-none"
        style={{ background: "linear-gradient(120deg, #212121 0%, #2c1f30 55%, #582a56 130%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/pattern.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "contain",
            opacity: 0.06,
          }}
        />
        <div className="relative px-6 md:px-9 pt-5 pointer-events-auto">
          <NavBar
            links={NAV_LINKS}
            bgColor="#DED4B0"
            bgOpacity={20}
            logoColor="#ffffff"
            pillBgColor="#ffffff"
            pillBgOpacity={50}
          />
        </div>
        <div className="relative px-6 md:px-9 pt-10 pb-10 pointer-events-auto">
          <div className="max-w-3xl">
            <p className="font-serif italic text-white/70 text-[15px] mb-1.5">
              Propuesta integral de dashboard para la transformación de los sistemas alimentarios en México
            </p>
            <h1 className="font-serif font-bold text-white text-[30px] md:text-[36px]">
              Semáforo estatal de transformación alimentaria
            </h1>
            <p className="font-sans text-white/70 mt-1.5" style={{ fontSize: 14 }}>
              Panel estatal de índices sintéticos por dominio · 32 entidades federativas
            </p>
          </div>
        </div>
      </div>

      <main className="px-6 md:px-9 py-8">
        {result.status === "success" ? (
          <IndicadoresDashboard dataset={result.data} />
        ) : (
          <DataUnavailableMessage
            variant={result.status === "unconfigured" ? "empty" : "error"}
            title="Tablero de indicadores no disponible"
            description="No fue posible cargar los datos del semáforo estatal en este momento."
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
