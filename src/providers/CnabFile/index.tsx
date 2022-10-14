import { createContext, useState, useContext } from "react";
import Api from "../../api";
import { Ichildrentype } from "../../interface";
import { useAuth } from "../authtoken";

interface CNABFile {
  id: string;
  title: string;
  file: string;
}

interface CNABProviderData {
  cnabFile: CNABFile;
  changeCnabFile: (newFile: CNABFile) => void;
  cnabList: CNABFile[];
  changeCnabList: (newFile: CNABFile) => void;
  addCnabFile: ({ title, file }: CNABFile) => void;
  transcriptFile: (cnab_Id: number) => void;
  getCnabFile: () => void;
}

export const CnabFileContext = createContext<CNABProviderData>(
  {} as CNABProviderData
);

export const CnabFileProvider = ({ children }: Ichildrentype) => {
  const [cnabFile, setCnabFile] = useState<CNABFile>({} as CNABFile);
  const [cnabList, setCnabList] = useState<CNABFile[]>([]);
  const { auth } = useAuth();

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
  const addCnabFile = ({ file, title }: CNABFile) => {
    Api.post(
      "transaction/upload",
      { title, file },
      {
        headers: { Authorization: `Bearer ${auth}` },
      }
    )
      .then((res) => {
        getCnabFile();
      })
      .catch((err) => console.log(err));
  };

  const transcriptFile = (cnab_id: number) => {
    Api.post(`transaction/file/${cnab_id}/`, {
      headers: { Authorization: `Bearer ${auth}` },
    });
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
