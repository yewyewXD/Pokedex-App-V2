import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { PokemonProvider } from "./context/PokemonState";

ReactDOM.render(
  <PokemonProvider>
    <App />
  </PokemonProvider>,
  document.getElementById("root")
);
