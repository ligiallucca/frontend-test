import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Clients from "./pages/Clients/Clients";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "styled-components";
import { theme } from "./config/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <Clients />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
