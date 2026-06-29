import Image                              from "next/image";
import { Footer }                        from "@/components/molecules/Footer";
import { TeamHeroSection }               from "@/components/organisms/TeamHeroSection";
import { ProblematicaSection }           from "@/components/organisms/ProblematicaSection";
import { DirectivosSection }             from "@/components/organisms/DirectivosSection";
import { EquipoTecnicoSection }          from "@/components/organisms/EquipoTecnicoSection";
import { ColaboracionesSection }         from "@/components/organisms/ColaboracionesSection";
import { TeamStatsSection }              from "@/components/organisms/TeamStatsSection";
import { IniciativasEnCursoSection }     from "@/components/organisms/IniciativasEnCursoSection";
import { ProductosInvestigacionSection } from "@/components/organisms/ProductosInvestigacionSection";
import { ColaboraCTASection }            from "@/components/organisms/ColaboraCTASection";
import pattern                           from "@/assets/pattern/pattern.svg";

export default function EquipoPage() {
  return (
    <main>
      <TeamHeroSection />
      <ProblematicaSection />

      {/* Directivos → Equipo Técnico → Colaboraciones con patrón de fondo */}
      <div className="relative" style={{ zIndex: 0 }}>
        <Image
          src={pattern}
          alt=""
          aria-hidden
          className="absolute top-0 left-0 h-3/4 w-auto pointer-events-none select-none"
          style={{ zIndex: -1, opacity: 0.12 }}
        />
        <DirectivosSection />
        <EquipoTecnicoSection />
        <ColaboracionesSection />
      </div>

      <TeamStatsSection />
      <IniciativasEnCursoSection />
      <ProductosInvestigacionSection />
      <ColaboraCTASection />
      <Footer />
    </main>
  );
}
