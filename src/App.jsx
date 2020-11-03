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

      <Grid container style={{ marginTop: "60px" }}>
        <Grid container item justify={"center"} sm={2}>
          <SearchBar />
          <FilterBar />
        </Grid>

        <Grid
          container
          item
          justify={"center"}
          alignItems={"center"}
          sm={10}
          style={{ padding: "36px 48px" }}
        >
          {allPokemon && (
            <Grid
              container
              spacing={3}
              justify={"center"}
              alignItems={"center"}
            >
              {allPokemon.map((pokemon) => (
                <Grid
                  item
                  container
                  xl={2}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  justify={"center"}
                  align={"center"}
                  key={pokemon.id}
                >
                  <OverviewCard
                    pokemonDetail={pokemon}
                    id={pokemon.id}
                    name={pokemon.name}
                    types={pokemon.types.map((type) => type.type.name)}
                    image={pokemon.image}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
