import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import Api from "../../../api";
import { useModal } from "../../../providers/modal";
import { StyledButton } from "../../../styles/Button/style";
import { StyledInput } from "../../../styles/Input/styles";

function RegisterForm() {
  const { changeModal } = useModal();
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Campo obrigatório")
      .min(5, "O nome de usuário deve conter no mínimo 5 caracteres")
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Nome Inválido! "
      ),
    email: yup
      .string()
      .required("Digite seu Email!")
      .email("Email não é válido"),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "A senha precisa ter 8 digitos")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/,
        "Está faltando um caractere especial, ou um número ou uma letra maiuscula ou minuscula"
      ),

    first_name: yup
      .string()
      .required("Campo obrigatório")
      .min(3, "Primeiro nome deve conter no mínimo 3 caracteres"),
    last_name: yup
      .string()
      .required("Campo obrigatório")
      .min(4, "Sobrenome deve haver no minimo 4 caracteres"),
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
      return true;
    };
    if (errorsIsEmpty()) {
      Api.post("users/register/", data)
        .then((res) => {
          changeModal();
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)}>
        <StyledInput
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && <span>{String(errors.username?.message)}</span>}
        <StyledInput type="text" placeholder="E-mail" {...register("email")} />
        {errors.email && <span>{String(errors.email?.message)}</span>}
        <StyledInput
          type="text"
          placeholder="First name"
          {...register("first_name")}
        />
        {errors.first_name && <span>{String(errors.first_name?.message)}</span>}
        <StyledInput
          type="text"
          placeholder="Last Name"
          {...register("last_name")}
        />
        {errors.last_name && <span>{String(errors.last_name?.message)}</span>}
        <StyledInput
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <span>{String(errors.password?.message)}</span>}
        <StyledInput
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword")}
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
