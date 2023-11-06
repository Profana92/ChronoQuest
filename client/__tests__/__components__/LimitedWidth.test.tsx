import { getByRole, render, screen } from "@testing-library/react";
import LimitedWidthContainer from "@/components/containers/LimitedWidthContainer";
describe("FullWidth component tests", () => {
  it("should render child H1 on screen", () => {
    render(
      <LimitedWidthContainer>
        <h1>This is a Heading Text</h1>
      </LimitedWidthContainer>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("should render more than one child element.", () => {
    render(
      <LimitedWidthContainer>
        <h1>This is a Heading Text</h1>
        <p>This is a Paragraph Text</p>
      </LimitedWidthContainer>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(/This is a Paragraph Text/i)).toBeInTheDocument();
  });
  it("should have w-full class.", () => {
    render(
      <LimitedWidthContainer>
        <h1>This is a Heading Text</h1>
      </LimitedWidthContainer>
    );

    expect(screen.getByTestId(/FullWidthDiv/i)).toHaveClass(
      "max-w-[1920px] mx-auto"
    );
  });
  it("should have additional class passed by props.", () => {
    render(
      <LimitedWidthContainer additionalClasses="custom class">
        <h1>This is a Heading Text</h1>
      </LimitedWidthContainer>
    );

    expect(screen.getByTestId(/FullWidthDiv/i)).toHaveClass("custom class");
  });
});
