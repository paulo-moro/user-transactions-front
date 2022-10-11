# Aplicação de contatos de usuário.

Aplicação front end para a api de cadastro de usuários e contatos.
repo da api:

```
https://github.com/paulo-moro/user-contacts-back-node
```

## Iniciar aplicação

```
yarn start
```

## Ligando à api

Caso utilize o docker, a porta utilizada no localhost será a 8080, então é necessário modificar a porta no arquivo index.ts na API, caso seja utilizado localmente, está configurado a porta 8003.

```
Api>index.ts
/* Caso seja executado localmente yarn dev */
const Api = axios.create({ baseURL: "http://localhost:8003" }) ||
/* Caso seja executado via docker */
const Api = axios.create({ baseURL: "http://localhost:8080" });
```

## Libs

```
styled-components
react-icons
yup
react-hook-form
@hookform/resolvers
```

## Observações

Para logar no aplicativo, é necessário cadastrar uma conta, link disponivel na página inicial de login, após o cadastro basta logar no aplicativo, e é possivel cadastrar, editar e deletar contatos.
