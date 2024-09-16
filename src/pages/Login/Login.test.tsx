import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Login from "./Login";
import { ThemeProvider } from "styled-components";
import { theme } from "../../config/theme";
import { AuthContext } from "../../context/AuthContext";

import { BrowserRouter } from "react-router-dom";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          isAuthenticated: false,
          userName: "",
          login: mockLogin,
          logout: vi.fn(),
        }}
      >
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

beforeEach(() => {
  mockNavigate.mockClear();
  mockLogin.mockClear();
});

test("renders login form with title and input field", () => {
  renderWithProviders(<Login />);

  expect(screen.getByText(/olá, seja bem-vindo!/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/digite seu nome/i)).toBeInTheDocument();
  expect(screen.getByText(/entrar/i)).toBeInTheDocument();
});

test("input field updates value correctly", () => {
  renderWithProviders(<Login />);

  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  fireEvent.change(inputElement, { target: { value: "João Silva" } });
  expect(inputElement).toHaveValue("João Silva");
});

test("button is disabled when input is invalid", async () => {
  renderWithProviders(<Login />);

  const buttonElement = screen.getByText(/entrar/i);
  expect(buttonElement).toBeDisabled();

  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  fireEvent.change(inputElement, { target: { value: "João Silva" } });

  await waitFor(() => {
    expect(buttonElement).toBeEnabled();
  });
});

test("button click triggers login function", async () => {
  renderWithProviders(<Login />);

  const inputElement = screen.getByPlaceholderText(/digite seu nome/i);
  fireEvent.change(inputElement, { target: { value: "João Silva" } });

  const buttonElement = screen.getByText(/entrar/i);
  fireEvent.click(buttonElement);

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith("João Silva");
  });
});
