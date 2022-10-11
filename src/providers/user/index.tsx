import { createContext, useState, useContext, useEffect } from "react";
import Api from "../../api";
import { Ichildrentype } from "../../interface";
import { useAuth } from "../authtoken";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface UserProviderData {
  user: User;
  changeUser: (newUser: User) => void;
  getUser: () => void;
}

export const userContext = createContext<UserProviderData>(
  {} as UserProviderData
);

export const UserProvider = ({ children }: Ichildrentype) => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  const { auth } = useAuth();
  useEffect(() => {
    auth && setUser(JSON.parse(localStorage.getItem("@user")!));
  }, []);

  const changeUser = (newUser: User) => setUser({ ...user, ...newUser });
  const getUser = () => {
    Api.get("/users", { headers: { Authorization: `Bearer ${auth}` } }).then(
      (res) => {
        changeUser(res.data);
      }
    );
  };
  return (
    <userContext.Provider value={{ changeUser, user, getUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  return context;
};
