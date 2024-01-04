import { useContext, useState } from "react";
import AppContext from "./AppContext";

export function useAuth() {
  return useContext(AppContext);
}

export default function AuthState(props) {
  const [user, setUser] = useState({
    username: null,
    password: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    // Authenticate user and set user information and authentication status
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove user information and set authentication status to false
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {props.children}
    </AppContext.Provider>
  );
}
