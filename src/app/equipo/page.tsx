import { Footer } from "@/components/molecules/Footer";
import { TeamHeroSection } from "@/components/organisms/TeamHeroSection";
import { ProblematicaSection } from "@/components/organisms/ProblematicaSection";
import { EquipoTecnicoSection } from "@/components/organisms/EquipoTecnicoSection";
import { ColaboracionesSection } from "@/components/organisms/ColaboracionesSection";
import { TeamStatsSection } from "@/components/organisms/TeamStatsSection";
import { IniciativasEnCursoSection } from "@/components/organisms/IniciativasEnCursoSection";
import { ProductosInvestigacionSection } from "@/components/organisms/ProductosInvestigacionSection";
import { ColaboraCTASection } from "@/components/organisms/ColaboraCTASection";
import { EQUIPO_TECNICO, EQUIPO_COLABORADORES, INSTITUCIONES_COLABORADORAS } from "./data";

export default function EquipoPage() {
    return (
        <main>
            <TeamHeroSection />
            <ProblematicaSection />
            <EquipoTecnicoSection members={EQUIPO_TECNICO} />
            <ColaboracionesSection
                colaboradores={EQUIPO_COLABORADORES}
                instituciones={INSTITUCIONES_COLABORADORAS}
            />
            <TeamStatsSection />
            <IniciativasEnCursoSection />
            <ProductosInvestigacionSection />
            <ColaboraCTASection />
            <Footer />
        </main>
    );
}
