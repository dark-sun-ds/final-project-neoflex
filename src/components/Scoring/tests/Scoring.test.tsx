import { describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import Scoring from "../Scoring";
import { setIsLoading, setIsSubmitted, setScoringData } from "../ScoringSlice";
import userEvent from "@testing-library/user-event";

describe("Scoring component", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Scoring />
      </Provider>
    );

  it("renders correctly", () => {
    store.dispatch(setIsLoading(false));
    store.dispatch(setIsSubmitted(false));
    renderComponent();
    expect(
      screen.getByRole("heading", { name: "Continuation of the application" })
    ).toBeInTheDocument();
    expect(screen.getByText("Step 2 of 5")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" })
    ).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    store.dispatch(setIsLoading(false));
    store.dispatch(setIsSubmitted(false));

    renderComponent();
    const submitButton = screen.getByRole("button", { name: "Continue" });
    await userEvent.click(submitButton);

    const expectedData = {
      gender: "MALE",
      maritalStatus: "MARRIED",
      dependentAmount: 0,
      passportIssueDate: "",
      passportIssueBranch: "",
      employment: {
        employmentStatus: "UNEMPLOYED",
        employerINN: "",
        salary: 0,
        position: "WORKER",
        workExperienceTotal: 0,
        workExperienceCurrent: 0,
      },
      account: "11223344556677890000",
    };

    await waitFor(() => {
     store.dispatch(setScoringData(expectedData));
      expect(store.getState().scoring.scoringData).toEqual(expectedData);
    });
  });

  it("displays loading", () => {
    store.dispatch(setIsLoading(true));
    store.dispatch(setIsSubmitted(false));

    renderComponent();
    expect(screen.getByAltText("Loader")).toBeInTheDocument();
  });

  it("displays submit", async () => {
    store.dispatch(setIsLoading(false));
    store.dispatch(setIsSubmitted(true));
    screen.debug();
    renderComponent();

    await waitFor(() => {
      store.dispatch(setIsSubmitted(true));
      expect(
        screen.queryByRole("generic", { name: "scoring-end" })
      ).toBeInTheDocument();
    });
  });
});
