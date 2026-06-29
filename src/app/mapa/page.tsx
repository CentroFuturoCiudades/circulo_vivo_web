"use client";

import { useState, useMemo } from "react";
import { NavBar }           from "@/components/molecules/NavBar";
import { SearchBar }        from "@/components/molecules/SearchBar";
import { FilterDropdown }   from "@/components/molecules/FilterDropdown";
import { InitiativesMap }   from "@/components/organisms/InitiativesMap";
import { MapFooter }        from "@/components/molecules/MapFooter";
import { INITIATIVES }      from "./data";

// ── Static config ──────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Inicio",      href: "/" },
  { label: "Equipo",      href: "/equipo" },
  { label: "Mapa",        href: "/mapa", active: true },
  { label: "Chatbot",     href: "/chatbot" },
  { label: "Indicadores", href: "/indicadores" },
];

const ACTOR_OPTIONS = [
  { value: "Sector privado", label: "Sector privado" },
  { value: "Sociedad civil", label: "Sociedad civil" },
  { value: "Academia",       label: "Academia"       },
  { value: "Gobierno",       label: "Gobierno"       },
  { value: "Cooperativa",    label: "Cooperativa"    },
  { value: "Mixto",          label: "Mixto"          },
];

const ESCALA_OPTIONS = [
  { value: "Local",         label: "Local"         },
  { value: "Regional",      label: "Regional"      },
  { value: "Estatal",       label: "Estatal"       },
  { value: "Nacional",      label: "Nacional"      },
  { value: "Internacional", label: "Internacional" },
];

const CATEGORIA_OPTIONS = [
  { value: "Producción",                             label: "Producción"                             },
  { value: "Consumo y acceso",                       label: "Consumo y acceso"                       },
  { value: "Distribución y comercialización",        label: "Distribución y comercialización"        },
  { value: "Transformación e innovación",            label: "Transformación e innovación"            },
  { value: "Gobernanza e incidencia",                label: "Gobernanza e incidencia"                },
  { value: "Redes y organización comunitaria",       label: "Redes y organización comunitaria"       },
  { value: "Financiamiento y soporte institucional", label: "Financiamiento y soporte institucional" },
];


// ── Page ───────────────────────────────────────────────────────────────────

export default function MapaPage() {
  const [search,   setSearch]   = useState("");
  const [actor,    setActor]    = useState<string | undefined>();
  const [escala,   setEscala]   = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();

  const filtered = useMemo(() => {
    return INITIATIVES.filter((i) => {
      if (!i?.id) return false;
      if (search) {
        const q = search.toLowerCase();
        const hit =
          i.title?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q) ||
          i.chips?.some((c) => c.label?.toLowerCase().includes(q));
        if (!hit) return false;
      }
      if (actor    && !i.chips?.some((c) => c.label === actor))    return false;
      if (escala   && !i.chips?.some((c) => c.label === escala))   return false;
      if (category && !i.chips?.some((c) => c.label === category)) return false;
      return true;
    });
  }, [search, actor, escala, category]);

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden bg-white">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{ background: "linear-gradient(135deg, #DED4B0 0%, #D1C6CF 100%)", opacity: 0.3 }}
      />

      {/* Pattern — left side only */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none select-none"
        style={{
          width: "50%",
          backgroundImage: "url('/pattern.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          backgroundSize: "contain",
          opacity: 0.08,
        }}
      />

      {/* NavBar */}
      <div className="relative z-20 px-6 md:px-9 pt-5">
        <NavBar
          links={NAV_LINKS}
          bgColor="#708B8D"
          bgOpacity={20}
          logoColor="#708B8D"
          pillBgColor="#ffffff"
          pillBgOpacity={50}
        />
      </div>

      {/* Search + filter bar */}
      <div className="relative z-20 flex items-center gap-4 px-6 md:px-9 py-3">
        <SearchBar
          size="sm"
          className="flex-1"
          value={search}
          onChange={setSearch}
          onSearch={setSearch}
        />
        <div className="flex items-center gap-2 shrink-0">
          <FilterDropdown label="Actor"     options={ACTOR_OPTIONS}    value={actor}    onChange={setActor}    />
          <FilterDropdown label="Escala"    options={ESCALA_OPTIONS}   value={escala}   onChange={setEscala}   />
          <FilterDropdown label="Categoría" options={CATEGORIA_OPTIONS} value={category} onChange={setCategory} align="right" />
        </div>
      </div>

      {/* Map */}
      <h1 className="sr-only">Mapa de iniciativas</h1>
      <div className="relative z-10 flex-1 min-h-0">
        <InitiativesMap initiatives={filtered} className="w-full h-full" />
      </div>

      {/* Footer */}
      <div className="relative z-20">
        <MapFooter />
      </div>
    </div>
  );
}
