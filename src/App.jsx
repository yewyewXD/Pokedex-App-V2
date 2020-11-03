import React, { useContext, useEffect } from "react";
import axios from "axios";
import {
  //styles
  ThemeProvider,
  createMuiTheme,
  Typography,
  //components
  Toolbar,
  Grid,
} from "@material-ui/core";
import { PokemonContext } from "./context/PokemonState";
import SearchBar from "./components/SearchBar";
import OverviewCard from "./components/pokemon/OverviewCard";
import FilterBar from "./components/FilterBar";
import Navbar from "./components/Navbar";

// const theme = createMuiTheme({
//   typography: {
//     h6: {
//       fontSize: 50,
//     },
//   },
//   palette: {},
// });

export default function App() {
  const { allPokemon, updateAllPokemon, storeAllPokemon } = useContext(
    PokemonContext
  );

  async function getAllPokemon() {
    try {
      let allPokemonDetail = [];
      const allPokemonRes = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
      );

      const allPokemon = allPokemonRes.data.results;

      await Promise.all(
        allPokemon.map(async (pokemon, index) => {
          const pokemonDetailRes = await axios.get(pokemon.url);
          const pokemonDetail = pokemonDetailRes.data;
          const pokemonImage = `https://pokeres.bastionbot.org/images/pokemon/${
            +index + 1
          }.png`;
          const newPokemonDetail = { ...pokemonDetail, image: pokemonImage };
          allPokemonDetail.unshift(newPokemonDetail);
        })
      );

      storeAllPokemon(allPokemonDetail);
      updateAllPokemon(allPokemonDetail);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <>
      <Navbar />

      <Grid container style={{ marginTop: "64px", padding: "36px 48px" }}>
        <Grid
          container
          item
          justify={"center"}
          sm={2}
          style={{ background: "grey" }}
        >
          <SearchBar />
          <FilterBar />
        </Grid>

        <Grid container item justify={"center"} alignItems={"center"} sm={10}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {allPokemon &&
              allPokemon.map((pokemon) => (
                <OverviewCard
                  pokemonDetail={pokemon}
                  id={pokemon.id}
                  name={pokemon.name}
                  types={pokemon.types.map((type) => type.type.name)}
                  image={pokemon.image}
                />
              ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
