import { createContext, useState, useContext } from "react";
import { Ichildrentype } from "../../interface";

interface ModalTypeProviderData {
  modalType: string;
  changeModalType: (type: string) => void;
}

export const modalTypeContext = createContext<ModalTypeProviderData>(
  {} as ModalTypeProviderData
);

export const ModalTypeProvider = ({ children }: Ichildrentype) => {
  const [modalType, setModalType] = useState("");

  const changeModalType = (type: string) => setModalType(type);

  return (
    <modalTypeContext.Provider value={{ changeModalType, modalType }}>
      {children}
    </modalTypeContext.Provider>
  );
};

export const useModalType = () => {
  const context = useContext(modalTypeContext);
  return context;
};
