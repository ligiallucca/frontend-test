import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { theme } from "./config/theme";
import Login from "./pages/Login/Login";
import Clients from "./pages/Clients/Clients";
import SelectedClients from "./pages/SelectedClients/SelectedClients";
import { SelectedClientsProvider } from "./context/SelectedClientsContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "styled-components";
function App() {
    return (_jsx(ThemeProvider, { theme: theme, children: _jsx(SelectedClientsProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/clients", element: _jsx(ProtectedRoute, { children: _jsx(Clients, {}) }) }), _jsx(Route, { path: "/selected-clients", element: _jsx(ProtectedRoute, { children: _jsx(SelectedClients, {}) }) })] }) }) }));
}
export default App;
