import { getByRole, render, screen } from "@testing-library/react";
import HeadingSecondary from "@/components/reusable/HeadingSecondary";
describe("FullWidth component tests", () => {
  it("should render child H1 on screen", () => {
    render(<HeadingSecondary>This is a Heading Text</HeadingSecondary>);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("should have text content This is a Heading Text", () => {
    render(<HeadingSecondary>This is a Heading Text</HeadingSecondary>);
    expect(screen.getByRole("heading")).toHaveTextContent(
      "This is a Heading Text"
    );
  });

  it("should have additional class passed by props.", () => {
    render(
      <HeadingSecondary additionalClasses="custom class">
        This is a Heading Text
      </HeadingSecondary>
    );
    expect(screen.getByRole("heading")).toHaveClass("custom class");
  });

  it("should have span inside.", () => {
    render(
      <HeadingSecondary>
        This is a<span>Span</span> Text
      </HeadingSecondary>
    );
    expect(screen.getByText("Span")).toBeInTheDocument();
  });
});
