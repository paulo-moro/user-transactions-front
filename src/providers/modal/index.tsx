import { createContext, useState, useContext } from "react";
import { Ichildrentype } from "../../interface";

interface ModalProviderData {
  modal: boolean;
  changeModal: () => void;
}

export const modalContext = createContext<ModalProviderData>(
  {} as ModalProviderData
);

export const ModalProvider = ({ children }: Ichildrentype) => {
  const [modal, setModal] = useState(false);

  const changeModal = () => setModal(!modal);

  return (
    <modalContext.Provider value={{ changeModal, modal }}>
      {children}
    </modalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(modalContext);
  return context;
};
