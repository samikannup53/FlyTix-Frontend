import { AuthProvider } from "./AuthContext";

export const AppProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
