import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { useTransactions } from "../../../providers/transactions";
import { useModal } from "../../../providers/modal";
import { useModalType } from "../../../providers/modalType";
import { StyledButton } from "../../../styles/Button/style";

function TransactionEditForm() {
  const { updateTransactions, deleteTransactions, transaction } =
    useTransactions();
  const { changeModal } = useModal();
  const { changeModalType } = useModalType();

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(8, "Digite seu nome com ao menos 08 caracteres!")
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Nome Inválido! "
      ),
    email: yup.string().email("Email não é válido"),
    phone: yup.string().min(11, "Número de telefone inválido"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateTransaction = (newData: FieldValues) => {
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
      updateTransactions(transaction!.id, newData);
      changeModalType("");
      changeModal();
    }
  };

  const deleteTransaction = (transactionId: number) => {
    deleteTransactions(transactionId);
    changeModalType("");
  };

  return (
    <form onSubmit={handleSubmit(updateTransaction)}>
      <input value={transaction.type.description} disabled />
      <input value={transaction.type.nature} disabled />
      <input value={transaction.shop_name} disabled />
      <input value={transaction.shop_rep} disabled />
      <input value={transaction.amount} disabled />
      <input value={transaction.CPF} disabled />
      <input value={transaction.card} disabled />
      <input value={transaction.transaction_date} disabled />
      <input value={transaction.transaction_time} disabled />
      <StyledButton
        type="button"
        onClick={() => deleteTransaction(transaction!.id)}
      >
        Delete
      </StyledButton>
      <StyledButton type="submit">Save</StyledButton>
    </form>
  );
}

export default TransactionEditForm;
