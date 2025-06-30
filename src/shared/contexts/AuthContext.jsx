import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Not Authorized");
      }
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
    setLoading(false);
  };

  useEffect(() => {
    refreshUser().finally(() => {
      return setLoading(false);
    });
  }, []);

  const logout = async () => {
    await fetch("http://localhost:8000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    await refreshUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user ? true : false,
        logout,
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
