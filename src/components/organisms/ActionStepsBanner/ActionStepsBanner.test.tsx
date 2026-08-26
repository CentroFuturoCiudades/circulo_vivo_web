import { render, screen } from "@testing-library/react";
import { ActionStepsBanner } from "./ActionStepsBanner";

describe("ActionStepsBanner", () => {
  it("renders the title and each numbered step", () => {
    render(
      <ActionStepsBanner
        title="A la acción."
        steps={[
          { text: "Saber dónde y cómo intervenir" },
          { text: "Dar seguimiento" },
          { text: "Para exigir mejoras e involucrarse" },
        ]}
      />
    );

    expect(screen.getByText("A la acción.")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Saber dónde y cómo intervenir")).toBeInTheDocument();
    expect(screen.getByText("Dar seguimiento")).toBeInTheDocument();
    expect(screen.getByText("Para exigir mejoras e involucrarse")).toBeInTheDocument();
  });
});
