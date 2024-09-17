import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Login from "./Login";
import { ThemeProvider } from "styled-components";
import { theme } from "../../config/theme";
import { AuthContext } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const renderWithProviders = (ui) => {
    return render(_jsx(BrowserRouter, { children: _jsx(AuthContext.Provider, { value: {
                isAuthenticated: false,
                userName: "",
                login: mockLogin,
                logout: vi.fn(),
            }, children: _jsx(ThemeProvider, { theme: theme, children: ui }) }) }));
};
beforeEach(() => {
    mockNavigate.mockClear();
    mockLogin.mockClear();
});
test("renders login form with title and input field", () => {
    renderWithProviders(_jsx(Login, {}));
    expect(screen.getByText(/olá, seja bem-vindo!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/digite seu nome/i)).toBeInTheDocument();
    expect(screen.getByText(/entrar/i)).toBeInTheDocument();
});
test("input field updates value correctly", () => {
    renderWithProviders(_jsx(Login, {}));
    const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
    fireEvent.change(inputElement, { target: { value: "João Silva" } });
    expect(inputElement).toHaveValue("João Silva");
});
test("button is disabled when input is invalid", async () => {
    renderWithProviders(_jsx(Login, {}));
    const buttonElement = screen.getByText(/entrar/i);
    expect(buttonElement).toBeDisabled();
    const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
    fireEvent.change(inputElement, { target: { value: "João Silva" } });
    await waitFor(() => {
        expect(buttonElement).toBeEnabled();
    });
});
test("button click triggers login function", async () => {
    renderWithProviders(_jsx(Login, {}));
    const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
    fireEvent.change(inputElement, { target: { value: "João Silva" } });
    const buttonElement = screen.getByText(/entrar/i);
    fireEvent.click(buttonElement);
    await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("João Silva");
    });
});
