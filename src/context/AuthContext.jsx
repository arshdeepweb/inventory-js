import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("username");
    if (token) {
    //   const decoded = jwtDecode(token);
      setUser(token);
    }
  }, []);

  const login = (name) => {
    localStorage.setItem("username", name);
    setUser(name);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
