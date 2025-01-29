import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Prescoring from "../Prescoring";
import { Provider } from "react-redux";
import { setFormData, setIsSubmitted } from "../PrescoringFormSlice";
import { FormData } from "../formUtils";
import { store } from "../../../store";
import { setIsLoading } from "../PrescoringFormSlice";

describe("Prescoring Component", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Prescoring />
      </Provider>
    );
  const expectedData: FormData = {
    amount: 0,
    term: 6,
    firstName: "test",
    middleName: "testMiddleName",
    lastName: "testLastName",
    email: "test@test.com",
    birthdate: "",
    passportSeries: "",
    passportNumber: "",
  };

  beforeEach(() => {
    store.dispatch(setFormData(expectedData));
  });

  it("renders correctly", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: "Customize your card" })
    ).toBeInTheDocument();
    expect(screen.getByText("Step 1 of 5")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" })
    ).toBeInTheDocument();
  });

  it("displays loading", () => {
    store.dispatch(setIsLoading(true));
    store.dispatch(setIsSubmitted(false));

    renderComponent();
    expect(screen.getByAltText("Loader")).toBeInTheDocument();
  });

  it("displays submit", async () => {
    store.dispatch(setIsLoading(false));

    renderComponent();
    await waitFor(() => {
      store.dispatch(setIsSubmitted(true));
      expect(
        screen.queryByRole("generic", { name: "loan-offers" })
      ).toBeInTheDocument();
    });
  });
});
