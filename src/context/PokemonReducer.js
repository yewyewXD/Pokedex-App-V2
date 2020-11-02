export default function PokemonReducer(state, action) {
  switch (action.type) {
    case "STORE_ALL_POKEMON":
      return {
        ...state,
        constantAllPokemon: action.payload,
      };

    case "UPDATE_ALL_POKEMON":
      return {
        ...state,
        allPokemon: action.payload,
      };

    default:
      return state;
  }
}
