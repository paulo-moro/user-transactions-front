import { createContext, useState, useContext } from "react";
import Api from "../../api";
import { Ichildrentype } from "../../interface";
import { useAuth } from "../authtoken";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface ContactPatial {
  name?: string;
  phone?: string;
  email?: string;
}

interface ContactsProviderData {
  contacts: Contact[];
  addContacts: (contact: Contact) => void;
  getContacts: () => void;
  updateContacts: (id: string, newData: ContactPatial) => void;
  deleteContacts: (id: string) => void;
}

export const ContactsContext = createContext<ContactsProviderData>(
  {} as ContactsProviderData
);

export const ContactsProvider = ({ children }: Ichildrentype) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { auth } = useAuth();
  const addContacts = (contact: Contact) => setContacts([contact, ...contacts]);

  const getContacts = () => {
    Api.get(`contact/`, { headers: { Authorization: `Bearer ${auth}` } })
      .then((res) => {
        setContacts(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateContacts = (id: string, newData: ContactPatial) => {
    Api.patch(`contact/${id}`, newData, {
      headers: { Authorization: `Bearer ${auth}` },
    }).then((res) => {
      getContacts();
    });
  };

  const deleteContacts = (id: string) => {
    Api.delete(`contact/${id}`, {
      headers: { Authorization: `Bearer ${auth}` },
    }).then((res) => {
      getContacts();
    });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContacts,
        updateContacts,
        deleteContacts,
        getContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  return context;
};
