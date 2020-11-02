import { useState, useContext } from "react";
import { Radio } from "@material-ui/core";
import { PokemonContext } from "../context/PokemonState";

export default function FilterBar() {
  const [selectedValue, setSelectedValue] = useState(null);
  const { filterPokemon } = useContext(PokemonContext);

  const handleChange = (e) => {
    const filterValue = e.target.value;
    setSelectedValue(filterValue);
    console.log("[FilterBar]:", filterValue);
    filterPokemon(filterValue);
  };

  return (
    <div>
      <Radio
        checked={selectedValue === "a-to-z"}
        onChange={handleChange}
        value="a-to-z"
        name="filter-button"
      />
      <Radio
        checked={selectedValue === "z-to-a"}
        onChange={handleChange}
        value="z-to-a"
        name="filter-button"
      />
    </div>
  );
}
