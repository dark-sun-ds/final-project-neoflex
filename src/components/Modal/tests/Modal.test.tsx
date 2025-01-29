import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../Modal";
import React from 'react'
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios"); 

vi.mock("../Button/Button", () => {
  return {
    Button: vi.fn(({ title, onClick, ...rest }) => (
      <button onClick={onClick} {...rest}>
        {title}
      </button>
    )),
  };
});

describe("Modal Component", () => {
  it("renders correctly", () => {
    render(<Modal showModal={vi.fn()} />);
    expect(screen.getByText("Deny application")).toBeInTheDocument();
    expect(
      screen.getByText("You exactly sure, you want to cancel this application?")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Deny" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", async () => {
    const mockShowModal = vi.fn();
    render(<Modal showModal={mockShowModal} />);
    await userEvent.click(
      screen.getByRole("button", { name: /close button/i })
    ); 
    expect(mockShowModal).toHaveBeenCalledWith(false);
  });

  it("closes modal when cancel button is clicked", async () => {
    const mockShowModal = vi.fn();
    render(<Modal showModal={mockShowModal} />);
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(mockShowModal).toHaveBeenCalledWith(false);
  });

  it("sends rejection request and updates state", async () => {
    const mockShowModal = vi.fn();
    localStorage.setItem("id", "123"); 
    const mockAxiosPost = vi.mocked(axios.post).mockResolvedValue({}); 

    render(<Modal showModal={mockShowModal} />);
    await userEvent.click(screen.getByRole("button", { name: "Deny" }));

    expect(mockAxiosPost).toHaveBeenCalledWith(
      "http://localhost:8080/application/123/deny"
    );
    await waitFor(() =>
      expect(
        screen.getByText("Your application has been deny!")
      ).toBeInTheDocument()
    );
  });

  it("handles rejection error", async () => {
    localStorage.setItem("id", "123");
    vi.mocked(axios.post).mockRejectedValue(new Error("Rejection failed"));

    render(<Modal showModal={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Deny" }));

  });

  it("displays loader while request is in progress", async () => {
    localStorage.setItem("id", "123");
    vi.mocked(axios.post).mockImplementation(() => new Promise(() => {})); 

    render(<Modal showModal={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Deny" }));

    expect(screen.getByRole("img", {name:"Loader"})).toBeInTheDocument(); 
  });

  it('displays "Go home" button after denial', async () => {
    localStorage.setItem("id", "123");
    vi.mocked(axios.post).mockResolvedValue({});
    render(<Modal showModal={vi.fn()} />);
    await userEvent.click(screen.getByRole("button", { name: "Deny" }));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Go home" })
      ).toBeInTheDocument()
    );
  });

  it('calls showModal with false when "Go home" button is clicked', async () => {
    const mockShowModal = vi.fn();
    localStorage.setItem("id", "123");
    vi.mocked(axios.post).mockResolvedValue({});
    render(<Modal showModal={mockShowModal} />);
    await userEvent.click(screen.getByRole("button", { name: "Deny" }));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Go home" })
      ).toBeInTheDocument()
    );
    await userEvent.click(screen.getByRole("button", { name: "Go home" }));
    expect(mockShowModal).toHaveBeenCalledWith(false);
  });
});
