import { describe } from "vitest";
import { setActiveTab } from "../TabsSlice";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import Tabs from "../Tabs";
import { store } from "../../../store";


describe("Tabs Component", () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );
  it('renders TabAbout when activeTab is "About card"', () => {

    renderComponent();
    expect(screen.getByText("About card")).toBeInTheDocument();
  });

  it('renders TabAbout when activeTab is "Rates and conditions"', () => {
    store.dispatch(setActiveTab("Rates and conditions"));
    renderComponent();

    expect(
      screen.queryByRole("table", { name: "tab-conditions" })
    ).toBeInTheDocument();
  });

  it('renders TabAbout when activeTab is "Cashback"', () => {
    store.dispatch(setActiveTab("Cashback"));
    renderComponent();
    screen.debug();
    expect(
      screen.queryByRole("generic", { name: "tab-cashbacks" })
    ).toBeInTheDocument();
  });

  it('renders TabAbout when activeTab is "FAQ"', () => {
    store.dispatch(setActiveTab("FAQ"));
    renderComponent();

    expect(screen.queryByRole("generic", { name: "tab-faq" })).toBeInTheDocument();
  });
});
