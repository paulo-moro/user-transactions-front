import { createContext, useState, useContext } from "react";
import { Ichildrentype } from "../../interface";

interface ContactProviderData {
  contactType: string;
  changeContact: (type: string) => void;
}

export const ContactTypeContext = createContext<ContactProviderData>(
  {} as ContactProviderData
);

export const ContactTypeProvider = ({ children }: Ichildrentype) => {
  const [contactType, setcontactType] = useState<string>("");

  const changeContact = (type: string) => setcontactType(type);

  return (
    <ContactTypeContext.Provider value={{ changeContact, contactType }}>
      {children}
    </ContactTypeContext.Provider>
  );
};

export const useContactType = () => {
  const context = useContext(ContactTypeContext);
  return context;
};
