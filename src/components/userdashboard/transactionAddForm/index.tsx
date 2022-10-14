import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import Api from "../../../api";
import { useAuth } from "../../../providers/authtoken";
import { useTransactions } from "../../../providers/transactions";
import { StyledButton } from "../../../styles/Button/style";
import { StyledInput } from "../../../styles/Input/styles";
interface Type {
  id: number;
  description: string;
  nature: string;
  signal: string;
}
function TransactionAddForm() {
  const { addTransactions, getTransactions } = useTransactions();
  const { auth } = useAuth();

  const schema = yup.object().shape({
    title: yup
      .string()
      .required("É requerido um título para o arquivo CNAB!")
      .min(5, "O título deve conter no mínimo 05 caracteres!")
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Título Inválido, somente letras são permitidas! "
      ),
    file: yup.object().shape({
      file: yup.mixed().required("File is required"),
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addTransaction = ({ title, file }: FieldValues) => {
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

    if (errorsIsEmpty()) {
      Api.post(
        "/transaction",
        { title, file },
        {
          headers: { Authorization: `Bearer ${auth}` },
        }
      )
        .then((res) => {
          addTransactions(res.data);
          getTransactions();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(addTransaction)}>
        <StyledInput
          type="file"
          placeholder="Título do arquivo"
          required
          {...register("title")}
        />

        <StyledInput type="file" required {...register("file")} />

        <StyledButton type="submit">Save</StyledButton>
      </form>
    </>
  );
}

export default TransactionAddForm;
