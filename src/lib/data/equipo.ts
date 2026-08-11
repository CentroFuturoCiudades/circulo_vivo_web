import type { MiembroTecnico } from "@/components/organisms/EquipoTecnicoSection";
import type { Colaborador, InstitutionLogo } from "@/components/organisms/ColaboracionesSection";
import type { Directivo } from "@/components/organisms/DirectivosSection";
import { dataResultOk, type DataResult } from "./types";
import directivosSnapshot from "@/data/snapshot/directivos.json";
import equipoTecnicoSnapshot from "@/data/snapshot/equipo-tecnico.json";
import colaboradoresSnapshot from "@/data/snapshot/colaboradores.json";
import institucionesSnapshot from "@/data/snapshot/instituciones.json";

/**
 * DEMO BRANCH — contingency for when Azure Blob env vars aren't available.
 * Serves a point-in-time snapshot of the real data (fetched from Azure once,
 * frozen into src/data/snapshot/*.json + public/data-snapshot/ images) instead
 * of hitting Azure at request time. Never merge this branch into dev/main —
 * once the Azure env vars are confirmed working, this file should go back to
 * fetching live from Azure (see git history on dev).
 */

export async function getDirectivos(): Promise<DataResult<Directivo[]>> {
  return dataResultOk(directivosSnapshot as Directivo[]);
}

export async function getEquipoTecnico(): Promise<DataResult<MiembroTecnico[]>> {
  return dataResultOk(equipoTecnicoSnapshot as MiembroTecnico[]);
}

export async function getEquipoColaboradores(): Promise<DataResult<Colaborador[]>> {
  return dataResultOk(colaboradoresSnapshot as Colaborador[]);
}

export async function getInstitucionesColaboradoras(): Promise<DataResult<InstitutionLogo[]>> {
  return dataResultOk(institucionesSnapshot as InstitutionLogo[]);
}
