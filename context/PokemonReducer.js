export default function PokemonReducer(state, action) {
  switch (action.type) {
    case "UPDATE_ALL_POKEMON":
      return {
        ...state,
        allPokemon: action.payload,
      };

    default:
      return state;
  }
}
