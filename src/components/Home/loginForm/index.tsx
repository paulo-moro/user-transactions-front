import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../providers/modal";
import Api from "../../../api";
import { useAuth } from "../../../providers/authtoken";
import { useModalType } from "../../../providers/modalType";
import { StyledButton } from "../../../styles/Button/style";
import { StyledInput } from "../../../styles/Input/styles";
import { toast } from "react-toastify";
function LoginForm() {
  const { changeModal } = useModal();
  const { changeAuth } = useAuth();
  const { changeModalType } = useModalType();
  const schema = yup.object().shape({
    username: yup
      .string()
      .min(5, "O nome de usuário deve conter no mínimo 5 caracteres")
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
        "Nome Inválido! "
      ),

    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "A senha precisa ter 8 digitos")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{4,}$/,
        "Está faltando um caractere especial, ou um número ou uma letra maiuscula ou minuscula"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const handleLogin = ({ username, password }: FieldValues) => {
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
    console.log(username, password);
    if (errorsIsEmpty()) {
      Api.post("users/login/", { username, password })
        .then((res) => {
          localStorage.setItem("@authToken", res.data.token);
          changeAuth(res.data.token);
          Api.get("users/profile", {
            headers: { Authorization: `Bearer ${res.data.token}` },
          })
            .then((res) => {
              localStorage.setItem("@user", JSON.stringify(res.data));
              toast.success("Login efetuado com sucesso");
            })
            .catch((err) => console.error(err.response.data));

          history.push("/dashboard");
        })
        .catch((err) => console.error(err.response.data));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <h2>Login</h2>
        <StyledInput
          type="username"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && <span>{String(errors.username?.message)}</span>}
        <StyledInput
          type="password"
          placeholder="Password"
          required
          {...register("password")}
        />
        {errors.email && <span>{String(errors.password?.message)}</span>}
        <StyledButton type="submit">Sign in</StyledButton>
        <p>
          You do not have an account? click{" "}
          <span
            onClick={() => {
              changeModal();
              changeModalType("register");
            }}
          >
            here
          </span>
        </p>
      </form>
    </>
  );
}

export default LoginForm;
