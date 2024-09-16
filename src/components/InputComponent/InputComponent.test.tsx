import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ThemeProvider } from "styled-components";
import { theme } from "../../config/theme";

import InputComponent from "./InputComponent";

const renderInputComponent = () => {
  render(
    <ThemeProvider theme={theme}>
      <InputComponent
        name="userName"
        placeholder="Digite seu nome"
        required
        errorMessage="Nome é obrigatório"
        value=""
        onChange={() => {}}
      />
    </ThemeProvider>
  );
};

const renderInputFilledComponent = () => {
  render(
    <ThemeProvider theme={theme}>
      <InputComponent
        name="userName"
        placeholder="Digite seu nome"
        required
        errorMessage="Nome é obrigatório"
        value="João Silva"
        onChange={() => {}}
      />
    </ThemeProvider>
  );
};

test("renders input component", () => {
  renderInputComponent();
  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  expect(inputElement).toBeInTheDocument();
});

test("shows error message when input is required and not filled", () => {
  renderInputComponent();
  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  fireEvent.blur(inputElement);
  const errorMessage = screen.queryByText(/Nome é obrigatório/i);
  waitFor(() => expect(errorMessage).toBeInTheDocument());
});

test("input value updates correctly", async () => {
  renderInputFilledComponent();
  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  fireEvent.change(inputElement, { target: { value: "João Silva" } });
  await waitFor(() => expect(inputElement).toHaveValue("João Silva"));
});

test("calls onChange function when input value changes", async () => {
  const handleChange = vi.fn();

  render(
    <ThemeProvider theme={theme}>
      <InputComponent
        name="userName"
        placeholder="Digite seu nome"
        required
        errorMessage="Nome é obrigatório"
        value=""
        onChange={handleChange}
      />
    </ThemeProvider>
  );

  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  fireEvent.change(inputElement, { target: { value: "João Silva" } });
  await waitFor(() => expect(handleChange).toHaveBeenCalled());
});
