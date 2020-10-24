import Head from "next/head";
import axios from "axios";
import {
  //styles
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  colors,
  Typography,
  //components
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Grid,
} from "@material-ui/core";

// icons

// fonts
import "fontsource-roboto";
import SearchBar from "../components/SearchBar";

// const useStyles = makeStyles({
//   root: {
//     background: "lightgrey",
//     border: "5px solid grey",
//     borderRadius: 0,
//     color: "white",
//     padding: "0 30px",
//   },
//   appBar: {
//     marginTop: "5rem",
//   },
// });

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
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SearchBar />
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const allPokemonRes = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=2&offset=0"
    );

    const allPokemon = allPokemonRes.data.results;

    let allPokemonDetail = [];
    // for (const pokemon of allPokemon) {
    //   const pokemonDetailRes = await axios.get(pokemon.url);
    //   const pokemonDetail = pokemonDetailRes.data;
    //   allPokemonDetail.push(pokemonDetail);
    // }
    await Promise.all(
      allPokemon.map(async (pokemon, index) => {
        const pokemonDetailRes = await axios.get(pokemon.url);
        const pokemonDetail = pokemonDetailRes.data;
        const pokemonImage = `https://pokeres.bastionbot.org/images/pokemon/${
          +index + 1
        }.png`;
        const newPokemonDetail = { ...pokemonDetail, image: pokemonImage };
        allPokemonDetail.push(newPokemonDetail);
      })
    );

    return {
      props: { allPokemonDetail },
    };
  } catch (err) {
    console.error(err);
  }
}
