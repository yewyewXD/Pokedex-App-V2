import Head from "next/head";
import axios from "axios";
import {
  //styles
  ThemeProvider,
  createMuiTheme,
  Typography,
  //components
  Toolbar,
  IconButton,
  Paper,
  Grid,
} from "@material-ui/core";

// icons

// fonts
import "fontsource-roboto";
import SearchBar from "../components/SearchBar";
import Layout from "../components/Layout";
import OverviewCard from "../components/pokemon/OverviewCard";

// const theme = createMuiTheme({
//   typography: {
//     h6: {
//       fontSize: 50,
//     },
//   },
//   palette: {},
// });

export default function Home({ allPokemonDetail }) {
  console.log(allPokemonDetail);
  return (
    <Layout title={"Pokemon V2"} description={"We are back to catch them all"}>
      <SearchBar />

      {/* all pokemon cards */}
      <Grid container spacing={1} justify={"center"} align={"center"}>
        {allPokemonDetail.map((pokemon) => (
          <Grid
            item
            container
            lg={2}
            md={3}
            sm={4}
            xs={6}
            justify={"center"}
            align={"center"}
            key={pokemon.id}
          >
            <OverviewCard
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types.map((type) => type.type.name)}
              image={pokemon.image}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const allPokemonRes = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=2&offset=0"
    );

    const allPokemon = allPokemonRes.data.results;

    let allPokemonDetail = [];

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

    console.log("[index.js] get all pokemon");

    return {
      props: { allPokemonDetail },
    };
  } catch (err) {
    console.error(err);
  }
}
