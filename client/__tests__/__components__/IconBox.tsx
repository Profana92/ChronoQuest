import { getByRole, render, screen } from "@testing-library/react";
import IconBox from "@/components/reusable/IconBox";
import { SiNextdotjs } from "react-icons/si";
describe("FullWidth component tests", () => {
  it("should render screen", () => {
    render(
      <IconBox>
        <SiNextdotjs />
      </IconBox>
    );
    expect(screen.getByTestId("IconBoxId")).toBeInTheDocument();
  });
  it("should render child SVG on screen", () => {
    render(
      <IconBox>
        <SiNextdotjs />
      </IconBox>
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
  it("should render with additional class", () => {
    render(
      <IconBox additionalClasses="custom class">
        <SiNextdotjs />
      </IconBox>
    );
    expect(screen.getByTestId("IconBoxId")).toHaveClass("custom class");
  });
});
