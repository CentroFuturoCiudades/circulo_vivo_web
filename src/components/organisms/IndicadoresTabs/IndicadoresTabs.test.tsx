import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IndicadoresTabs } from "./IndicadoresTabs";
import type { DataResult } from "@/lib/data/types";
import type { IndicadoresDataset } from "@/lib/azure/indicadores";

jest.mock("@/components/organisms/IndicadoresConoceSection", () => ({
  IndicadoresConoceSection: ({ onExplorar }: { onExplorar?: () => void }) => (
    <div>
      <p>conoce-section</p>
      <button onClick={onExplorar}>ir a explora</button>
    </div>
  ),
}));

jest.mock("@/components/organisms/IndicadoresDashboard", () => ({
  IndicadoresDashboard: () => <div>dashboard-section</div>,
}));

const UNCONFIGURED: DataResult<IndicadoresDataset> = { status: "unconfigured" };

describe("IndicadoresTabs", () => {
  it("shows the Conoce section by default", () => {
    render(<IndicadoresTabs dashboardResult={UNCONFIGURED} />);
    expect(screen.getByText("conoce-section")).toBeInTheDocument();
    expect(screen.queryByText("dashboard-section")).not.toBeInTheDocument();
  });

  it("switches to the unavailable message on Explora when data isn't configured", async () => {
    render(<IndicadoresTabs dashboardResult={UNCONFIGURED} />);
    await userEvent.click(screen.getByRole("tab", { name: /explora/i }));
    expect(screen.getByText("Tablero de indicadores no disponible")).toBeInTheDocument();
  });

  it("switches to the dashboard on Explora when data loaded successfully", async () => {
    const success: DataResult<IndicadoresDataset> = {
      status: "success",
      data: {} as IndicadoresDataset,
    };
    render(<IndicadoresTabs dashboardResult={success} />);
    await userEvent.click(screen.getByRole("tab", { name: /explora/i }));
    expect(screen.getByText("dashboard-section")).toBeInTheDocument();
  });

  it("lets the Conoce CTA jump straight to Explora", async () => {
    render(<IndicadoresTabs dashboardResult={UNCONFIGURED} />);
    await userEvent.click(screen.getByText("ir a explora"));
    expect(screen.getByText("Tablero de indicadores no disponible")).toBeInTheDocument();
  });
});
