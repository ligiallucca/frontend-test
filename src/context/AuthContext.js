import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const login = (name) => {
        setUserName(name);
        setIsAuthenticated(true);
        navigate("/clients");
    };
    const logout = () => {
        setUserName("");
        setIsAuthenticated(false);
        navigate("/login");
    };
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, userName, login, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
export { AuthContext };
