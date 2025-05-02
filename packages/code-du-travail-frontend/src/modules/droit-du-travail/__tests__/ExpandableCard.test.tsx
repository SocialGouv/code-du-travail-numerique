import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpandableCard from "../ExpandableCard";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe("<ExpandableCard />", () => {
  const defaultProps = {
    title: "Test Title",
    iconSrc: "/test-icon.svg",
    children: <p>Test content</p>,
  };

  it("renders correctly with default props", () => {
    const { container } = render(<ExpandableCard {...defaultProps} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "/test-icon.svg"
    );
    expect(container).toMatchSnapshot();
  });

  it("does not show content when initially rendered", () => {
    render(<ExpandableCard {...defaultProps} />);
    expect(screen.queryByText("Test content")).not.toBeInTheDocument();
  });

  it("shows content when expanded", () => {
    render(<ExpandableCard {...defaultProps} />);

    // Click the button to expand
    fireEvent.click(screen.getByRole("button"));

    // Content should now be visible
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("hides content when collapsed after being expanded", () => {
    render(<ExpandableCard {...defaultProps} />);

    // Click to expand
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Test content")).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("Test content")).not.toBeInTheDocument();
  });

  it("renders with custom background color", () => {
    const { container } = render(
      <ExpandableCard
        {...defaultProps}
        backgroundColor="var(--background-alt-grey)"
      />
    );

    // The first div should have the background color
    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveStyle("background: var(--background-alt-grey)");
  });

  it("renders with bottom tab when showBottomTab is true", () => {
    const { container } = render(
      <ExpandableCard {...defaultProps} showBottomTab={true} />
    );

    // Instead of checking for the CSS class, we'll check if the component renders
    // an additional div when showBottomTab is true
    // The bottomTab is rendered as the last child of the container
    const expandedContent = screen.queryByText("Test content");
    expect(expandedContent).not.toBeInTheDocument(); // Content is not visible initially

    // Click to expand
    fireEvent.click(screen.getByRole("button"));

    // Now check the structure - there should be a div after the content div
    // when showBottomTab is true
    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer.childNodes.length).toBeGreaterThan(2); // Button, content, and bottom tab
  });

  it("does not render bottom tab when showBottomTab is false", () => {
    const { container } = render(
      <ExpandableCard {...defaultProps} showBottomTab={false} />
    );

    // Check that the bottom tab div doesn't exist
    const bottomTab = container.querySelector('[class*="bottomTab"]');
    expect(bottomTab).not.toBeInTheDocument();
  });

  it("uses provided id attribute", () => {
    const { container } = render(
      <ExpandableCard {...defaultProps} id="test-id" />
    );

    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveAttribute("id", "test-id");
  });
});
