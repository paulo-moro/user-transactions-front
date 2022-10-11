import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { useModal } from "../../../providers/modal";
import { StyledButton } from "../../../styles/Button/style";
import { StyledInput } from "../../../styles/Input/styles";

function RegisterForm() {
  const { changeModal } = useModal();
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Digite seu nome completo!")
      .min(8, "Digite seu nome com ao menos 08 caracteres!")
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
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "A senha precisa ter 8 digitos")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/,
        "Está faltando um caractere especial, ou um número ou uma letra maiuscula ou minuscula"
      ),
    confirmPassword: yup
      .string()
      .required("Campo obrigatório")
      .oneOf([yup.ref("password")], "A senha e a cofirmação não são iguais"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = (data: FieldValues) => {
    const errorsIsEmpty = () => {
      for (let key in errors) {
        if (errors.hasOwnProperty(key)) {
          return false;
        } else {
          return true;
        }
      }
    };

    if (errorsIsEmpty()) {
      changeModal();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)}>
        <StyledInput type="text" placeholder="Name" {...register("name")} />
        {errors.name && <span>{String(errors.name?.message)}</span>}
        <StyledInput type="text" placeholder="E-mail" {...register("email")} />
        {errors.email && <span>{String(errors.email?.message)}</span>}
        <StyledInput type="text" placeholder="Phone" {...register("phone")} />
        {errors.phone && <span>{String(errors.phone?.message)}</span>}
        <StyledInput
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <span>{String(errors.password?.message)}</span>}
        <StyledInput
          type="password"
          placeholder="Confirm password"
          {...register("confirmpassword")}
        />
        {errors.confirmPassword && (
          <span>{String(errors.confirmPassword?.message)}</span>
        )}
        <StyledButton type="submit">Register</StyledButton>
      </form>
    </>
  );
}

export default RegisterForm;
