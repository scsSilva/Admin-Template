import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { ExclamationIcon } from "../components/Icons";
import useAuthData from "../data/hook/useAuthData";
import firebase from "../firebase/config";

export default function Authentication() {
  const { loginGoogle, loginEmailAndPassword, signUpEmailAndPassword } =
    useAuthData();

  const [mode, setMode] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const showError = (msg: string, time: number) => {
    setError(msg);
    setTimeout(() => setError(""), time * 1000);
  };

  const submit = async () => {
    try {
      if (mode == "login") {
        await loginEmailAndPassword(email, password);
      } else {
        await signUpEmailAndPassword(email, password);
      }
    } catch (err) {
      const error = err as firebase.FirebaseError;
      showError(error?.message ?? "Erro desconhecido!", 5);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da tela de autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-3xl font-bold mb-5">
          {mode == "login"
            ? "Entre com a sua conta"
            : "Cadastre-se na plataforma"}
        </h1>

        {error ? (
          <div className="flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
            {ExclamationIcon}
            <span className="ml-3 text-center">{error}</span>
          </div>
        ) : (
          false
        )}

        <AuthInput
          label="Email"
          type="email"
          value={email}
          changeValue={setEmail}
          required
        />
        <AuthInput
          label="Senha"
          type="password"
          value={password}
          changeValue={setPassword}
          required
        />

        <button
          onClick={submit}
          className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6"
        >
          {mode == "login" ? "Entrar" : "Cadastrar"}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        <button
          onClick={loginGoogle}
          className="w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3"
        >
          Entrar com Google
        </button>

        {mode == "login" ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              className="text-blue-500 hover-text-blue-700 font-semibold cursor-pointer"
              onClick={() => setMode("cadastro")}
            >
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              className="text-blue-500 hover-text-blue-700 font-semibold cursor-pointer"
              onClick={() => setMode("login")}
            >
              Entre com suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
