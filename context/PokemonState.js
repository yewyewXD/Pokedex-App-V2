import { createGenerateClassName } from "@material-ui/core";
import React, { useReducer, createContext } from "react";
import PokemonReducer from "./PokemonReducer";

const initialState = {
  constantAllPokemon: [],
  allPokemon: [],
  isLoading: false,
};

export const PokemonContext = createContext(initialState);

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PokemonReducer, initialState);

  function storeAllPokemon(pokemon) {
    dispatch({
      type: "STORE_ALL_POKEMON",
      payload: pokemon,
    });
  }

  function updateAllPokemon(pokemon) {
    console.log("[updateAllPokemon]:", pokemon);
    dispatch({
      type: "UPDATE_ALL_POKEMON",
      payload: pokemon,
    });
  }

  function sortingPokemon(filterState, variable) {
    switch (variable) {
      case "a-to-z":
        return filterState.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

      case "z-to-a":
        return filterState.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });

      case "asc-id":
        return filterState.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });

      case "desc-id":
        return filterState.sort((a, b) => {
          if (a.id < b.id) {
            return 1;
          }
          if (a.id > b.id) {
            return -1;
          }
          return 0;
        });

      default:
        return filterState;
    }
  }

  function sortPokemon(variable) {
    updateAllPokemon(sortingPokemon(state.allPokemon, variable));
    storeAllPokemon(sortingPokemon(state.constantAllPokemon, variable));
  }

  function searchPokemon(term) {
    if (!term) {
      updateAllPokemon(state.constantAllPokemon);
    } else {
      updateAllPokemon(
        state.constantAllPokemon.filter(
          (pokemon) => pokemon.name.indexOf(term) > -1
        )
      );
    }
  }

  return (
    <PokemonContext.Provider
      value={{
        constantAllPokemon: state.constantAllPokemon,
        allPokemon: state.allPokemon,
        isLoading: state.isLoading,
        storeAllPokemon,
        updateAllPokemon,
        sortPokemon,
        searchPokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
