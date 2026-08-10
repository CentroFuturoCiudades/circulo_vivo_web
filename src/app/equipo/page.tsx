import { Footer } from "@/components/molecules/Footer";
import { TeamHeroSection } from "@/components/organisms/TeamHeroSection";
import { ProblematicaSection } from "@/components/organisms/ProblematicaSection";
import { EquipoTecnicoSection } from "@/components/organisms/EquipoTecnicoSection";
import { ColaboracionesSection } from "@/components/organisms/ColaboracionesSection";
import { TeamStatsSection } from "@/components/organisms/TeamStatsSection";
import { IniciativasEnCursoSection } from "@/components/organisms/IniciativasEnCursoSection";
import { ProductosInvestigacionSection } from "@/components/organisms/ProductosInvestigacionSection";
import { ColaboraCTASection } from "@/components/organisms/ColaboraCTASection";
import { getEquipoTecnico, getEquipoColaboradores, getInstitucionesColaboradoras } from "@/lib/data/equipo";
import { toSectionState } from "@/lib/data/types";

export default async function EquipoPage() {
    const [equipoTecnicoResult, colaboradoresResult, institucionesResult] = await Promise.all([
        getEquipoTecnico(),
        getEquipoColaboradores(),
        getInstitucionesColaboradoras(),
    ]);

    const equipoTecnico = toSectionState(equipoTecnicoResult);
    const colaboradores = toSectionState(colaboradoresResult);
    const instituciones = toSectionState(institucionesResult);

    return (
        <main>
            <TeamHeroSection />
            <ProblematicaSection />
            <EquipoTecnicoSection members={equipoTecnico.items} state={equipoTecnico.state} />
            <ColaboracionesSection
                colaboradores={colaboradores.items}
                instituciones={instituciones.items}
                colaboradoresState={colaboradores.state}
                institucionesState={instituciones.state}
            />
            <TeamStatsSection />
            <IniciativasEnCursoSection />
            <ProductosInvestigacionSection />
            <ColaboraCTASection />
            <Footer />
        </main>
    );
}
