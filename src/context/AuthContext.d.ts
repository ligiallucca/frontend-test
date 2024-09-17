interface AuthContextProps {
    isAuthenticated: boolean;
    userName: string;
    login: (name: string) => void;
    logout: () => void;
}
declare const AuthContext: import("react").Context<AuthContextProps | undefined>;
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: () => AuthContextProps;
export { AuthContext };
//# sourceMappingURL=AuthContext.d.ts.map