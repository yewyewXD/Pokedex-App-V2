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

export default function Home({ allPokemon }) {
  console.log(allPokemon);

  function receiveSpeech() {
    const content = document.querySelector(".content");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
      console.log("voice is activated!");
    };

    recognition.onresult = function (e) {
      const current = e.resultIndex;

      const transcript = e.results[current][0].transcript;
      content.textContent = transcript;

      readOutLoud(transcript);
    };

    recognition.start();

    function readOutLoud(message) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = message;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={receiveSpeech}>speak</button>

      <h5 className="content"></h5>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0"
    );
    const { results } = await res.json();
    const allPokemon = results.map((eachPokemon, index) => {
      const image = `https://pokeres.bastionbot.org/images/pokemon/${index}.png`;
      return { ...eachPokemon, image };
    });
    return {
      props: { allPokemon },
    };
  } catch (err) {
    console.error(err);
  }
}
