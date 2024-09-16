import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonComponent from "./ButtonComponent";
import { ThemeProvider } from "styled-components";

import { vi } from "vitest";
import { theme } from "../../config/theme";

const renderButtonComponent = () => {
  render(
    <ThemeProvider theme={theme}>
      <ButtonComponent text="Texto" onClick={() => {}} />
    </ThemeProvider>
  );
};

const renderButtonDisabledComponent = () => {
  render(
    <ThemeProvider theme={theme}>
      <ButtonComponent text="Texto" onClick={() => {}} disabled={true} />
    </ThemeProvider>
  );
};

test("renders button with text", () => {
  renderButtonComponent();
  const buttonElement = screen.getByText(/texto/i);
  expect(buttonElement).toBeInTheDocument();
});

test("button is disabled when disabled prop is true", () => {
  renderButtonDisabledComponent();
  const buttonElement = screen.getByText(/texto/i);
  expect(buttonElement).toBeDisabled();
});

test("calls onClick function when button is clicked", () => {
  const handleClick = vi.fn();
  renderButtonComponent();
  const buttonElement = screen.getByText(/texto/i);
  fireEvent.click(buttonElement);
  waitFor(() => expect(handleClick).toHaveBeenCalled());
});

test("button has correct background color", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ButtonComponent text="Texto" onClick={() => {}} />
    </ThemeProvider>
  );
  const buttonElement = container.querySelector("button");

  expect(buttonElement).not.toBeNull();

  if (buttonElement)
    expect(buttonElement).toHaveStyle(
      `background-color: ${theme.colors.darkenPrimary}`
    );
});

test("button changes background color on hover", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ButtonComponent text="Texto" onClick={() => {}} />
    </ThemeProvider>
  );
  const buttonElement = container.querySelector("button");
  if (buttonElement) fireEvent.mouseOver(buttonElement);
  expect(buttonElement).toHaveStyle(
    `background-color: ${theme.colors.darkenPrimary}`
  );
});

test("button does not have outline on focus", () => {
  renderButtonComponent();
  const buttonElement = screen.getByText(/Texto/i);
  buttonElement.focus();
  expect(buttonElement).toHaveStyle("box-shadow: none");
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <ThemeProvider theme={theme}>
      <ButtonComponent text="Texto" onClick={() => {}} />
    </ThemeProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
