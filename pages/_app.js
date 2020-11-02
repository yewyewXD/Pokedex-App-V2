import "../styles/globals.css";
import { PokemonProvider } from "../context/PokemonState";

function MyApp({ Component, pageProps }) {
  return (
    <PokemonProvider>
      <Component {...pageProps} />
    </PokemonProvider>
  );
}

export default MyApp;
