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
  return (
    <ThemeProvider theme={theme}>
      <SelectedClientsProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/selected-clients"
            element={
              <ProtectedRoute>
                <SelectedClients />
              </ProtectedRoute>
            }
          />
        </Routes>
      </SelectedClientsProvider>
    </ThemeProvider>
  );
}

export default App;
