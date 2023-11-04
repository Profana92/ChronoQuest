import { getByRole, render, screen } from "@testing-library/react";
import HalfWidthContainer from "@/components/containers/HalfWidthContainer";
describe("FullWidth component tests", () => {
  it("should render child H1 on screen", () => {
    render(
      <HalfWidthContainer>
        <h1>This is a Heading Text</h1>
      </HalfWidthContainer>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("should render more than one child element.", () => {
    render(
      <HalfWidthContainer>
        <h1>This is a Heading Text</h1>
        <p>This is a Paragraph Text</p>
      </HalfWidthContainer>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText(/This is a Paragraph Text/i)).toBeInTheDocument();
  });
  it("should have w-full class.", () => {
    render(
      <HalfWidthContainer>
        <h1>This is a Heading Text</h1>
      </HalfWidthContainer>
    );

    expect(screen.getByTestId(/HalfWidthContainerDiv/i)).toHaveClass("w-1/2");
  });
  it("should have additional class passed by props.", () => {
    render(
      <HalfWidthContainer classes="custom class">
        <h1>This is a Heading Text</h1>
      </HalfWidthContainer>
    );

    expect(screen.getByTestId(/HalfWidthContainerDiv/i)).toHaveClass(
      "custom class"
    );
  });
});
