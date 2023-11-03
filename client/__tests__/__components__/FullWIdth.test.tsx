import { getByRole, render, screen } from "@testing-library/react";
import FullWidth from "@/components/containers/FullWidth";
describe("FullWidth component tests", () => {
  it("should render child H1 on screen", () => {
    render(
      <FullWidth>
        <h1>This is a Heading Text</h1>
      </FullWidth>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("should render more than one child element.", () => {
    render(
      <FullWidth>
        <h1>This is a Heading Text</h1>
        <p>This is a Paragraph Text</p>
      </FullWidth>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(/This is a Paragraph Text/i)).toBeInTheDocument();
  });
  it("should have w-full class.", () => {
    render(
      <FullWidth>
        <h1>This is a Heading Text</h1>
      </FullWidth>
    );

    expect(screen.getByTestId(/FullWidthDiv/i)).toHaveClass("w-full");
  });
});
