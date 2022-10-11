import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import Api from "../../../api";
import { useAuth } from "../../../providers/authtoken";
import { useContacts } from "../../../providers/contacts";
import { StyledButton } from "../../../styles/Button/style";
import { StyledInput } from "../../../styles/Input/styles";

function ContactAddForm() {
  const { addContacts } = useContacts();
  const { auth } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("É requerido um nome para o contato!")
      .min(5, "Digite seu nome com ao menos 05 caracteres!")
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Nome Inválido! "
      ),
    email: yup
      .string()
      .required("Digite seu Email!")
      .email("Email não é válido"),
    phone: yup
      .string()
      .required("Digite o seu telefone")
      .min(11, "Número de telefone inválido"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addContact = ({ email, name, phone }: FieldValues) => {
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
        "/contact",
        { email, name, phone },
        {
          headers: { Authorization: `Bearer ${auth}` },
        }
      )
        .then((res) => {
          addContacts(res.data);
          setName("");
          setPhone("");
          setEmail("");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(addContact)}>
        <StyledInput
          type="text"
          placeholder="Complete name"
          required
          {...register("name")}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <StyledInput
          type="tel"
          placeholder="(xx)xxxxx-xxxx"
          required
          {...register("phone")}
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <StyledInput
          type="email"
          placeholder="email"
          {...register("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledButton type="submit">Save</StyledButton>
      </form>
    </>
  );
}

export default ContactAddForm;
