import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { useContacts } from "../../../providers/contacts";
import { useEditContact } from "../../../providers/editcontact";
import { useModal } from "../../../providers/modal";
import { useModalType } from "../../../providers/modalType";
import { StyledButton } from "../../../styles/Button/style";

function ContactEditForm() {
  const { updateContacts, deleteContacts } = useContacts();
  const { changeModal } = useModal();
  const { contact } = useEditContact();
  const { changeModalType } = useModalType();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    setName(contact.name);
    setPhone(contact.phone);
    setEmail(contact.email);
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

  const updateContact = (newData: FieldValues) => {
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
      updateContacts(contact!.id, newData);
      changeModalType("");
      changeModal();
    }
  };

  const deleteContact = (contactId: string) => {
    deleteContacts(contactId);
    changeModalType("");
  };

  return (
    <form onSubmit={handleSubmit(updateContact)}>
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
      <StyledButton type="button" onClick={() => deleteContact(contact!.id)}>
        Delete
      </StyledButton>
      <StyledButton type="submit">Save</StyledButton>
    </form>
  );
}

export default ContactEditForm;
