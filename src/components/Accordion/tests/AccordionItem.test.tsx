//npm --experimental-vm-modules test

import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Accordion, { TAccordionItemProps } from "../Accordion";
import React from 'react'
import "@testing-library/jest-dom";

const mockDispatch = vi.fn();

describe("Accordion component", () => {
  const accordionData: TAccordionItemProps = {
    id: "1",
    title: "Test Title",
    content: "Test Content",
    isOpen: false,
  };

  const renderAccordion = (isOpen: boolean) => {
    render(
      <Accordion
        accordionId="accordion-1"
        accordionData={{ ...accordionData, isOpen }}
        dispatch={mockDispatch}
      />
    );
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test("renders only accordion title and correct icon", () => {
    renderAccordion(false);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByAltText("down-arrow")).toBeInTheDocument();
    
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  test("renders the accordion content and correct icon", () => {
    renderAccordion(true);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByAltText("up-arrow")).toBeInTheDocument();
    
    expect(screen.queryByText("Test Content")).toBeInTheDocument();
  });

  test("dispatches actions correctly on click", () => {
    renderAccordion(false);

    const accordionItem = screen.getByText("Test Title");
    fireEvent.click(accordionItem);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "accordion/closeOtherItems",
      payload: { itemId: "1" },
    });

    fireEvent.click(accordionItem);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "accordion/toggleItem",
      payload: { accordionId: "accordion-1", itemId: "1" },
    });
  });
});
