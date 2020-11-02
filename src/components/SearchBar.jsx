import { useState, useContext } from "react";
import { PokemonContext } from "../context/PokemonState";

export default function SearchBar() {
  const { searchPokemon } = useContext(PokemonContext);
  const [searchTerm, setSearchTerm] = useState("");

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

  function handleSearchPokemon(e) {
    const updatedSearchTerm = e.target.value;
    console.log("current search term:", updatedSearchTerm);
    setSearchTerm(updatedSearchTerm);
    searchPokemon(updatedSearchTerm);
  }

  return (
    <div>
      <button onClick={receiveSpeech}>speak</button>
      <input type="text" value={searchTerm} onChange={handleSearchPokemon} />

      <h5 className="content"></h5>
    </div>
  );
}
