import { jsx as _jsx } from "react/jsx-runtime";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../config/theme";
import InputComponent from "./InputComponent";
const renderInputComponent = () => {
    render(_jsx(ThemeProvider, { theme: theme, children: _jsx(InputComponent, { name: "userName", placeholder: "Digite seu nome", required: true, errorMessage: "Nome \u00E9 obrigat\u00F3rio", value: "", onChange: () => { } }) }));
};
const renderInputFilledComponent = () => {
    render(_jsx(ThemeProvider, { theme: theme, children: _jsx(InputComponent, { name: "userName", placeholder: "Digite seu nome", required: true, errorMessage: "Nome \u00E9 obrigat\u00F3rio", value: "Jo\u00E3o Silva", onChange: () => { } }) }));
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
    render(_jsx(ThemeProvider, { theme: theme, children: _jsx(InputComponent, { name: "userName", placeholder: "Digite seu nome", required: true, errorMessage: "Nome \u00E9 obrigat\u00F3rio", value: "", onChange: handleChange }) }));
    const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
    fireEvent.change(inputElement, { target: { value: "João Silva" } });
    await waitFor(() => expect(handleChange).toHaveBeenCalled());
});
