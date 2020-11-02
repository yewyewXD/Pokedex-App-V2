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
      A to Z
      <Radio
        checked={selectedValue === "a-to-z"}
        onChange={handleChange}
        value="a-to-z"
        name="filter-button"
      />
      Z to A
      <Radio
        checked={selectedValue === "z-to-a"}
        onChange={handleChange}
        value="z-to-a"
        name="filter-button"
      />
      Ascending Id
      <Radio
        checked={selectedValue === "asc-id"}
        onChange={handleChange}
        value="asc-id"
        name="filter-button"
      />
      Descending Id
      <Radio
        checked={selectedValue === "desc-id"}
        onChange={handleChange}
        value="desc-id"
        name="filter-button"
      />
    </div>
  );
}
