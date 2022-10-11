import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { useTransactions } from "../../../providers/transactions";
import { useEditTransaction } from "../../../providers/edittransaction";
import { useModal } from "../../../providers/modal";
import { useModalType } from "../../../providers/modalType";
import { StyledButton } from "../../../styles/Button/style";

function TransactionEditForm() {
  const { updateTransactions, deleteTransactions } = useTransactions();
  const { changeModal } = useModal();
  const { transaction } = useEditTransaction();
  const { changeModalType } = useModalType();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    setName(transaction.name);
    setPhone(transaction.phone);
    setEmail(transaction.email);
  }, []);

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

  const deleteTransaction = (transactionId: string) => {
    deleteTransactions(transactionId);
    changeModalType("");
  };

  return (
    <form onSubmit={handleSubmit(updateTransaction)}>
      <input
        type="text"
        placeholder="Complete name"
        required
        {...register("name")}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="tel"
        placeholder="(xx)xxxxx-xxxx"
        required
        {...register("phone")}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        required
        {...register("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
