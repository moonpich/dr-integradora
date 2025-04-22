import { createContext, useState } from "react";
import { CloseSession, LoginService } from "../service/auth.service";
import { useNavigate } from "react-router";

// @ts-check
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({
    _id: "",
    username: "",
    emailUser: "",
  });
  const navigate = useNavigate();
  const login = async ({ emailUser, password }) => {
    const request = await LoginService({ emailUser, password });
    if (!request || request === null) {
      throw new Error("Login error");
    }
    const { username, email, _id } = request;
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("_id", _id);
    sessionStorage.setItem("email", email);
    setCredentials({
      _id,
      username,
      emailUser: email,
    });
    return true;
  };
  const logout = async () => {
    const requestLogOut = await CloseSession();
    if (!requestLogOut) {
      return;
    }
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("_id");
    sessionStorage.removeItem("email");
    setCredentials({
      _id: "",
      username: "",
      emailUser: "",
    });
    navigate("/");
  };
  return (
    <AuthContext.Provider
      value={{ credentials, login, logout, setCredentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};
