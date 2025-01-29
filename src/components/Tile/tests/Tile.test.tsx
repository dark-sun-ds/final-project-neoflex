import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Tile from "../Tile";

describe("Tile component", () => {
  it("renders correctly when elemAmount is 3", () => {
    const info = {
      img: "https://via.placeholder.com/150",
      title: "Test Title",
      subtitle: "Test Subtitle",
    };

    render(<Tile elemAmount={3} theme="normal" info={info} />);

    const imgElement = screen.getByAltText("icon");
    const titleElement = screen.getByText("Test Title");
    const subtitleElement = screen.getByText("Test Subtitle");

    expect(imgElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it("renders correctly when elemAmount is 2", () => {
    const info = {
      title: "Test Title",
      subtitle: "Test Subtitle",
    };

    render(<Tile elemAmount={2} theme="normal" info={info} />);

    const titleElement = screen.getByText("Test Title");
    const subtitleElement = screen.getByText("Test Subtitle");

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it("applies the correct theme class", () => {
    const info = {
      img: "https://via.placeholder.com/150",
      title: "Test Title",
      subtitle: "Test Subtitle",
    };

    const { container } = render(
      <Tile elemAmount={3} theme="dark" info={info} />
    );
    expect(container.firstChild).toHaveClass("tile dark");
  });

  it("does not render anything if elemAmount is not 2 or 3", () => {
    const info = {
      img: "https://via.placeholder.com/150",
      title: "Test Title",
      subtitle: "Test Subtitle",
    };

    const { container } = render(
      <Tile elemAmount={1} theme="normal" info={info} />
    );
    expect(container.firstChild).toBeNull();
  });
});
