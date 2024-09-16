import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Login from "./Login";
import { ThemeProvider } from "styled-components";
import { theme } from "../../config/theme";

test("renders login form with title and input field", () => {
  render(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );

  expect(screen.getByText(/olá, seja bem-vindo!/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/digite seu nome/i)).toBeInTheDocument();
  expect(screen.getByText(/entrar/i)).toBeInTheDocument();
});

test("input field updates value correctly", () => {
  render(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );

  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  fireEvent.change(inputElement, { target: { value: "João Silva" } });
  expect(inputElement).toHaveValue("João Silva");
});

test("button is disabled when input is invalid", async () => {
  render(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );

  const buttonElement = screen.getByText(/entrar/i);
  expect(buttonElement).toBeDisabled();

  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  fireEvent.change(inputElement, { target: { value: "João Silva" } });

  await waitFor(() => {
    expect(buttonElement).toBeEnabled();
  });
});

test("button click triggers handleClick function", async () => {
  const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

  render(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );

  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  fireEvent.change(inputElement, { target: { value: "João Silva" } });

  const buttonElement = screen.getByText(/entrar/i);
  fireEvent.click(buttonElement);

  await waitFor(() => {
    expect(consoleLogSpy).toHaveBeenCalledWith("botão ok");
  });

  consoleLogSpy.mockRestore();
});
