export default function PokemonReducer(state, action) {
  switch (action.type) {
    case "STORE_ALL_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
      };

    default:
      return state;
  }
}
