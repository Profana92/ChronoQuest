import { getByRole, render, screen } from "@testing-library/react";
import LinkPrimary from "@/components/reusable/LinkPrimary";

describe("LinkPrimary component tests", () => {
  it("should render on screen", () => {
    render(<LinkPrimary to="/contact">This is a link</LinkPrimary>);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("should have additional class passed by props.", () => {
    render(
      <LinkPrimary to="/contact" additionalClasses="custom class">
        This is a link
      </LinkPrimary>
    );
    expect(screen.getByRole("link")).toHaveClass("custom class");
  });

  it("should have a href with value of '/contact'", () => {
    render(<LinkPrimary to="/contact">Click Me</LinkPrimary>);
    expect(screen.getByRole("link", { name: "Click Me" })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
  it("should have a children passed by props.", () => {
    render(
      <LinkPrimary to="/contact">
        <h1>This is a Heading</h1>
      </LinkPrimary>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument;
  });
});
