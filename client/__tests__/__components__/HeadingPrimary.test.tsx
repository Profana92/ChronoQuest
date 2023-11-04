import { getByRole, render, screen } from "@testing-library/react";
import HeadingPrimary from "@/components/reusable/HeadingPrimary";
describe("FullWidth component tests", () => {
  it("should render child H1 on screen", () => {
    render(<HeadingPrimary>This is a Heading Text</HeadingPrimary>);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("should have text content This is a Heading Text", () => {
    render(<HeadingPrimary>This is a Heading Text</HeadingPrimary>);
    expect(screen.getByRole("heading")).toHaveTextContent(
      "This is a Heading Text"
    );
  });

  it("should have additional class passed by props.", () => {
    render(
      <HeadingPrimary additionalClasses="custom class">
        This is a Heading Text
      </HeadingPrimary>
    );
    expect(screen.getByRole("heading")).toHaveClass("custom class");
  });

  it("should have span inside.", () => {
    render(
      <HeadingPrimary>
        This is a<span>Span</span> Text
      </HeadingPrimary>
    );
    expect(screen.getByText("Span")).toBeInTheDocument();
  });
});
