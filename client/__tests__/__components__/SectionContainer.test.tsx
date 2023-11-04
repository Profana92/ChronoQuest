import { getByRole, render, screen } from "@testing-library/react";
import SectionContainer from "@/components/containers/SectionContainer";
describe("FullWidth component tests", () => {
  it("should render on screen", () => {
    render(<SectionContainer>This is an inner text</SectionContainer>);
    expect(screen.getByTestId("section")).toBeInTheDocument();
  });
  it("should render child H1 on screen", () => {
    render(
      <SectionContainer>
        <h1>This is a Heading Text</h1>
      </SectionContainer>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("should have text content This is an inner text", () => {
    render(<SectionContainer>This is an inner text</SectionContainer>);
    expect(screen.getByRole("generic")).toHaveTextContent(
      "This is an inner text"
    );
  });

  it("should have additional class passed by props.", () => {
    render(
      <SectionContainer additionalClasses="custom class">
        This is an inner text
      </SectionContainer>
    );
    expect(screen.getByTestId("section")).toHaveClass("custom class");
  });
});
