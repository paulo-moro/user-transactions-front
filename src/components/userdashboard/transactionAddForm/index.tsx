import { yupResolver } from "@hookform/resolvers/yup";
import { request } from "https";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import Api from "../../../api";
import { useAuth } from "../../../providers/authtoken";
import { useCnabFile } from "../../../providers/CnabFile";
import { useTransactions } from "../../../providers/transactions";
import { StyledButton } from "../../../styles/Button/style";
import { StyledInput } from "../../../styles/Input/styles";
import Dropzone from "../../dropzone";
interface Type {
  id: number;
  description: string;
  nature: string;
  signal: string;
}
function TransactionAddForm() {
  const { addTransactions, getTransactions } = useTransactions();
  const { auth } = useAuth();
  const { addCnabFile } = useCnabFile();
  const [file, setFile] = useState<File>({} as File);

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("É requerido um título para o arquivo CNAB!")
      .min(5, "O título deve conter no mínimo 05 caracteres!")
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Título Inválido, somente letras são permitidas! "
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpload = ({ title }: FieldValues) => {
    const errorsIsEmpty = () => {
      for (let key in errors) {
        if (errors.hasOwnProperty(key)) {
          return false;
        } else {
          return true;
        }
      }
      return true;
    };

    if (errorsIsEmpty() && file) {
      const requestBody = new FormData();

      requestBody.append("title", title);

      requestBody.append("file", file);

      addCnabFile(requestBody);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleUpload)}>
        <StyledInput
          type="text"
          placeholder="Título do arquivo"
          required
          {...register("title")}
        />
        <Dropzone onFileUploaded={setFile} />

        <StyledButton type="submit">Add file</StyledButton>
      </form>
    </>
  );
}

export default TransactionAddForm;
