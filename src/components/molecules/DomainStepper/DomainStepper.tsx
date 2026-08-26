"use client";

import { useState } from "react";
import { DomainChevronCard } from "@/components/molecules/DomainChevronCard";
import { SimpleModal } from "@/components/molecules/SimpleModal";

export interface DomainStepperItem {
  key: string;
  title: string;
  description: string;
}

export interface DomainStepperProps {
  items: DomainStepperItem[];
  className?: string;
}

/** Horizontal row of domain chevron cards; clicking one opens its explanation in a modal. */
export function DomainStepper({ items, className }: DomainStepperProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openItem = items.find((item) => item.key === openKey) ?? null;

  return (
    <div className={className}>
      <div className="flex flex-wrap justify-center gap-3">
        {items.map((item) => (
          <DomainChevronCard
            key={item.key}
            title={item.title}
            active={item.key === openKey}
            onSelect={() => setOpenKey(item.key)}
          />
        ))}
      </div>

      {openItem && (
        <SimpleModal title={openItem.title} onClose={() => setOpenKey(null)}>
          <p>{openItem.description}</p>
        </SimpleModal>
      )}
    </div>
  );
}
