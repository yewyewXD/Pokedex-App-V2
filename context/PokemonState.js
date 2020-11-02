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

  return (
    <PokemonContext.Provider
      value={{
        pokemon: state.pokemon,
        isLoading: state.isLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
