import { createContext, useState, useContext } from "react";
import { Ichildrentype } from "../../interface";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface EditContactProviderData {
  contact: User;
  changeEditContact: (editcontact: User) => void;
}

export const editContactContext = createContext<EditContactProviderData>(
  {} as EditContactProviderData
);

export const EditContactProvider = ({ children }: Ichildrentype) => {
  const [contact, setContact] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const changeEditContact = (editcontact: User) =>
    setContact({ ...contact, ...editcontact });

  return (
    <editContactContext.Provider value={{ contact, changeEditContact }}>
      {children}
    </editContactContext.Provider>
  );
};

export const useEditContact = () => {
  const context = useContext(editContactContext);
  return context;
};
