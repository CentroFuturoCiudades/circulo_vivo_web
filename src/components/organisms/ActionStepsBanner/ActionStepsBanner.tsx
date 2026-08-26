import { cn } from "@/lib/utils";

export interface ActionStep {
  text: string;
}

export interface ActionStepsBannerProps {
  title: string;
  steps: ActionStep[];
  className?: string;
}

/** Full-width olive banner with a numbered list of calls to action. */
export function ActionStepsBanner({ title, steps, className }: ActionStepsBannerProps) {
  return (
    <section className={cn("w-full bg-[#bcb884] py-14 md:py-16 px-6 md:px-12", className)}>
      <h2 className="font-serif italic font-bold text-white text-center text-[28px] md:text-[34px] mb-10">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto text-center">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <span className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-white/40 font-serif font-bold text-white text-[22px] leading-none">
              {i + 1}
            </span>
            <p className="font-sans font-semibold text-white text-[15px] leading-snug max-w-[200px]">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
