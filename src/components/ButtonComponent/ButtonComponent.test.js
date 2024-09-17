import { jsx as _jsx } from "react/jsx-runtime";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonComponent from "./ButtonComponent";
import { ThemeProvider } from "styled-components";
import { vi } from "vitest";
import { theme } from "../../config/theme";
const renderButtonComponent = () => {
    render(_jsx(ThemeProvider, { theme: theme, children: _jsx(ButtonComponent, { text: "Texto", onClick: () => { } }) }));
};
const renderButtonDisabledComponent = () => {
    render(_jsx(ThemeProvider, { theme: theme, children: _jsx(ButtonComponent, { text: "Texto", onClick: () => { }, disabled: true }) }));
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
    const { container } = render(_jsx(ThemeProvider, { theme: theme, children: _jsx(ButtonComponent, { text: "Texto", onClick: () => { } }) }));
    const buttonElement = container.querySelector("button");
    expect(buttonElement).not.toBeNull();
    if (buttonElement)
        expect(buttonElement).toHaveStyle(`background-color: ${theme.colors.darkenPrimary}`);
});
test("button changes background color on hover", () => {
    const { container } = render(_jsx(ThemeProvider, { theme: theme, children: _jsx(ButtonComponent, { text: "Texto", onClick: () => { } }) }));
    const buttonElement = container.querySelector("button");
    if (buttonElement)
        fireEvent.mouseOver(buttonElement);
    expect(buttonElement).toHaveStyle(`background-color: ${theme.colors.darkenPrimary}`);
});
test("button does not have outline on focus", () => {
    renderButtonComponent();
    const buttonElement = screen.getByText(/Texto/i);
    buttonElement.focus();
    expect(buttonElement).toHaveStyle("box-shadow: none");
});
test("matches snapshot", () => {
    const { asFragment } = render(_jsx(ThemeProvider, { theme: theme, children: _jsx(ButtonComponent, { text: "Texto", onClick: () => { } }) }));
    expect(asFragment()).toMatchSnapshot();
});
