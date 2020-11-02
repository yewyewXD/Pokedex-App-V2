import React, { useReducer, createContext } from "react";
import PokemonReducer from "./PokemonReducer";
import axios from "axios";

const initialState = {
  allPokemon: [],
  isLoading: false,
};

export const PokemonContext = createContext(initialState);

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PokemonReducer, initialState);

  function updateAllPokemon(pokemon) {
    console.log("[updateAllPokemon]:", pokemon);
    dispatch({
      type: "UPDATE_ALL_POKEMON",
      payload: pokemon,
    });
  }

  function filteringPokemon(variable) {
    switch (variable) {
      case "a-to-z":
        return state.allPokemon.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

      case "z-to-a":
        return state.allPokemon.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });

      case "asc-id":
        return state.allPokemon.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });

      case "desc-id":
        return state.allPokemon.sort((a, b) => {
          if (a.id < b.id) {
            return 1;
          }
          if (a.id > b.id) {
            return -1;
          }
          return 0;
        });

      default:
        return state.allPokemon;
    }
  }

  function filterPokemon(variable) {
    updateAllPokemon(filteringPokemon(variable));
  }

  return (
    <PokemonContext.Provider
      value={{
        allPokemon: state.allPokemon,
        isLoading: state.isLoading,
        updateAllPokemon,
        filterPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
