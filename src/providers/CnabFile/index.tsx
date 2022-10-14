import { createContext, useState, useContext, useEffect } from "react";

import Api from "../../api";
import { Ichildrentype } from "../../interface";
import { useAuth } from "../authtoken";
import { useModal } from "../modal";
import { useTransactions } from "../transactions";

interface CNABFile {
  id: number;
  title: string;
  file: string;
}

interface CNABProviderData {
  cnabFile: CNABFile;
  changeCnabFile: (newFile: CNABFile) => void;
  cnabList: CNABFile[];
  changeCnabList: (newFile: CNABFile) => void;
  addCnabFile: (requestBody: FormData) => void;
  transcriptFile: (cnab_Id: number) => void;
  getCnabFile: () => void;
  deleteCnabFile: (cnab_id: number) => void;
}

export const CnabFileContext = createContext<CNABProviderData>(
  {} as CNABProviderData
);

export const CnabFileProvider = ({ children }: Ichildrentype) => {
  const [cnabFile, setCnabFile] = useState<CNABFile>({} as CNABFile);
  const [cnabList, setCnabList] = useState<CNABFile[]>([]);
  const { auth, getAuth } = useAuth();
  const { changeModal } = useModal();
  const { getTransactions } = useTransactions();

  useEffect(() => {
    getAuth();
  }, []);
  const changeCnabFile = (newFile: CNABFile) => {
    setCnabFile({ ...cnabFile, ...newFile });
  };

  const changeCnabList = (newFile: CNABFile) => {
    setCnabList([...cnabList, newFile]);
  };

  const getCnabFile = () => {
    Api.get("transactions/files/")
      .then((res) => setCnabList(res.data))
      .catch((err) => console.log(err));
  };
  const addCnabFile = (requestBody: FormData) => {
    const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    Api.post("transactions/upload/", requestBody, headers)
      .then((res) => {
        getCnabFile();
        changeModal();
      })
      .catch((err) => console.log(err));
  };

  const deleteCnabFile = (cnab_id: number) => {
    Api.delete(`transactions/file/${cnab_id}`, {
      headers: { Authorization: `Token ${auth}` },
    })
      .then((res) => {
        getCnabFile();
   
      })
      .catch((err) => console.error("Deletion failed, try it later."));
  };

  const transcriptFile = (cnab_id: number) => {
    Api.post(`transaction/file/${cnab_id}/`, null, {
      headers: { Authorization: `Token ${auth}` },
    })
      .then(() => {
        getTransactions();
        getCnabFile();
      })
      .catch((err) => console.error(err));
  };

  return (
    <CnabFileContext.Provider
      value={{
        changeCnabFile,
        cnabFile,
        changeCnabList,
        cnabList,
        addCnabFile,
        transcriptFile,
        getCnabFile,
        deleteCnabFile,
      }}
    >
      {children}
    </CnabFileContext.Provider>
  );
};

export const useCnabFile = () => {
  const context = useContext(CnabFileContext);
  return context;
};
