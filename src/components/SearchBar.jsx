import { useState, useContext } from "react";
import { PokemonContext } from "../context/PokemonState";

import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MicIcon from "@material-ui/icons/Mic";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "min-content",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto",
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "9ch",
      "&:focus": {
        width: "15ch",
      },
    },
  },
}));

export default function SearchBar() {
  const { searchPokemon } = useContext(PokemonContext);
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles();

  function receiveSpeech() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
      console.log("voice is activated!");
    };

    recognition.onresult = function (e) {
      const current = e.resultIndex;

      const transcript = e.results[current][0].transcript;
      handleSearchPokemon(transcript);
      // readOutLoud(transcript);
    };

    recognition.start();

    // function readOutLoud(message) {
    //   const speech = new SpeechSynthesisUtterance();
    //   speech.text = message;
    //   speech.volume = 1;
    //   speech.rate = 1;
    //   speech.pitch = 1;

    //   window.speechSynthesis.speak(speech);
    // }
  }

  function handleSearchPokemon(term) {
    console.log("current search term:", term);
    setSearchTerm(term);
    searchPokemon(term.toLowerCase());
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <MicIcon
        onClick={receiveSpeech}
        fontSize="large"
        style={{ cursor: "pointer", margin: "50px 0" }}
      />
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          value={searchTerm}
          onChange={(e) => {
            handleSearchPokemon(e.target.value);
          }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </div>
  );
}
