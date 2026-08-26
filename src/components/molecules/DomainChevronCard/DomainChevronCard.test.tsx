import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DomainChevronCard } from "./DomainChevronCard";

describe("DomainChevronCard", () => {
  it("renders the title and the 'Conoce más' hint", () => {
    render(<DomainChevronCard title="Impulsores" />);
    expect(screen.getByText("Impulsores")).toBeInTheDocument();
    expect(screen.getByText("Conoce más")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", async () => {
    const onSelect = jest.fn();
    render(<DomainChevronCard title="Impulsores" onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { name: /impulsores/i }));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("reflects the active state via aria-pressed", () => {
    render(<DomainChevronCard title="Impulsores" active />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
