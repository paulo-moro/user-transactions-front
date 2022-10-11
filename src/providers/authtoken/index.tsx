import { createContext, useState, useContext } from "react";
import { Ichildrentype } from "../../interface";

interface AuthProviderData {
  auth: string;
  changeAuth: (type: string) => void;
  getAuth: () => void;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export const AuthProvider = ({ children }: Ichildrentype) => {
  const [auth, setAuth] = useState("");

  const changeAuth = (auth: string) => setAuth(auth);

  const getAuth = () => {
    const token = localStorage.getItem("@authToken");
    if (token) {
      setAuth(token);
    } else {
      setAuth("");
    }
  };

  return (
    <AuthContext.Provider value={{ changeAuth, auth, getAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
