import { getByRole, render, screen } from "@testing-library/react";
import FullWidthContainer from "@/components/containers/FullWidthContainer";
describe("FullWidth component tests", () => {
  it("should render child H1 on screen", () => {
    render(
      <FullWidthContainer>
        <h1>This is a Heading Text</h1>
      </FullWidthContainer>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("should render more than one child element.", () => {
    render(
      <FullWidthContainer>
        <h1>This is a Heading Text</h1>
        <p>This is a Paragraph Text</p>
      </FullWidthContainer>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(/This is a Paragraph Text/i)).toBeInTheDocument();
  });
  it("should have w-full class.", () => {
    render(
      <FullWidthContainer>
        <h1>This is a Heading Text</h1>
      </FullWidthContainer>
    );

    expect(screen.getByTestId(/FullWidthDiv/i)).toHaveClass("w-full");
  });
  it("should have additional class passed by props.", () => {
    render(
      <FullWidthContainer additionalClasses="custom class">
        <h1>This is a Heading Text</h1>
      </FullWidthContainer>
    );

    expect(screen.getByTestId(/FullWidthDiv/i)).toHaveClass("custom class");
  });
});
