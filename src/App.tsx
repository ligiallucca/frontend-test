import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { theme } from "./config/theme";
import Login from "./pages/Login/Login";
import Clients from "./pages/Clients/Clients";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
