import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContextProvider } from "../data/context/AppContext";
import { AuthProvider } from "../data/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </AuthProvider>
  );
}
