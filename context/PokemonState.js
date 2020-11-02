import React, { useReducer, createContext } from "react";
import PokemonReducer from "./PokemonReducer";
import axios from "axios";

const initialState = {
  pokemon: [],
  isLoading: false,
};

export const PokemonContext = createContext(initialState);

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PokemonReducer, initialState);

  function storeAllPokemon(pokemon) {
    console.log("[storeAllPokemon]: store pokemon from index.js");
    dispatch({
      type: "STORE_ALL_POKEMON",
      payload: pokemon,
    });
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemon: state.pokemon,
        isLoading: state.isLoading,
        storeAllPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
