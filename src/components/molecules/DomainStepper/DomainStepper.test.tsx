import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DomainStepper } from "./DomainStepper";

const ITEMS = [
  { key: "impulsores", title: "Impulsores", description: "Lo que empuja el cambio." },
  { key: "cadena", title: "Cadena de suministro", description: "De dónde sale la comida." },
];

describe("DomainStepper", () => {
  it("renders one chevron card per item and no modal initially", () => {
    render(<DomainStepper items={ITEMS} />);
    expect(screen.getByText("Impulsores")).toBeInTheDocument();
    expect(screen.getByText("Cadena de suministro")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the matching modal when a card is clicked", async () => {
    render(<DomainStepper items={ITEMS} />);
    await userEvent.click(screen.getByRole("button", { name: /impulsores/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Lo que empuja el cambio.")).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", async () => {
    render(<DomainStepper items={ITEMS} />);
    await userEvent.click(screen.getByRole("button", { name: /impulsores/i }));
    await userEvent.click(screen.getByRole("button", { name: /cerrar/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
