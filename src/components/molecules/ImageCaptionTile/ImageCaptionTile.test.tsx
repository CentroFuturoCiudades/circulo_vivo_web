import { render, screen } from "@testing-library/react";
import { ImageCaptionTile } from "./ImageCaptionTile";

describe("ImageCaptionTile", () => {
  it("renders the caption text", () => {
    render(<ImageCaptionTile image="/food.jpg" caption="Quién la siembra o cría" />);
    expect(screen.getByText("Quién la siembra o cría")).toBeInTheDocument();
  });
});
