import { useState } from "react";

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Grid,
} from "@material-ui/core";
import DetailedCard from "./DetailedCard";
import axios from "axios";

const cardStyles = makeStyles(
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      width: "330px",
      minHeight: "180px",
      padding: "30px 20px",
      borderRadius: "20px 5px",
      boxShadow: "grey 2px 2px 5px",
      margin: "10px",
    },
    rootLg: {
      display: "flex",
      alignItems: "center",
      width: "330px",
      minHeight: "180px",
      padding: "30px 20px",
      borderRadius: "20px 5px",
      margin: "10px",
      transition: "0.2s",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.1)",
        boxShadow: "grey 5px 5px 5px",
      },
    },
    title: {
      fontSize: "1.8rem",
      color: "white",
      fontWeight: "700",
      marginBottom: "5px",
    },
    label: {
      width: "100px",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      padding: "3px",
      margin: "5px 0",
      borderRadius: "20px",
      textAlign: "center",
      color: "white",
      fontWeight: "600",
    },
    image: {
      position: "absolute",
      height: "100px",
      width: "100px",
      marginLeft: "-15px",
    },
  })
);

function OverviewCard({ id, name, types, image, pokemonDetail }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [speciesDetail, setSpeciesDetail] = useState(null);
  const mdBreakPoint = useMediaQuery(useTheme().breakpoints.down("md"));

  async function getPokemonSpeciesDetail(id) {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    const data = res.data;
    const newSpeciesDetail = {
      eggGroups: data.egg_groups[0].name,
      description: data.flavor_text_entries[0].flavor_text,
      growthRate: data.growth_rate.name,
    };
    setSpeciesDetail(newSpeciesDetail);
    console.log("got new detail");
  }

  const handleOpenModal = () => {
    getPokemonSpeciesDetail(id);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const typeColor = () => {
    switch (types[0]) {
      case "normal":
        return "#A8A77A";
      case "fire":
        return "#EE8130";
      case "water":
        return "#6390F0";
      case "electric":
        return "#F7D02C";
      case "grass":
        return "#7AC74C";
      case "ice":
        return "#96D9D6";
      case "fighting":
        return "#C22E28";
      case "poison":
        return "#A33EA1";
      case "ground":
        return "#E2BF65";
      case "flying":
        return "#A98FF3";
      case "psychic":
        return "#F95587";
      case "bug":
        return "#A6B91A";
      case "rock":
        return "#B6A136";
      case "ghost":
        return "#735797";
      case "dragon":
        return "#6F35FC";
      case "dark":
        return "#705746";
      case "steel":
        return "#B7B7CE";
      case "fairy":
        return "#D685AD";
      default:
        return "#fff";
    }
  };

  function textCapitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const card = cardStyles();

  return (
    <>
      <div
        key={id}
        className={mdBreakPoint ? card.root : card.rootLg}
        style={{ background: typeColor() }}
        onClick={handleOpenModal}
      >
        <Grid container style={{ height: "100%" }}>
          <Grid
            item
            container
            xs={8}
            alignItems={"flex-start"}
            justify={"flex-start"}
            direction="column"
          >
            <div className={card.title}>{textCapitalize(name)}</div>

            {types.map((type, index) => (
              <div key={index} className={card.label}>
                {textCapitalize(type)}
              </div>
            ))}
          </Grid>

          <Grid
            item
            container
            xs={4}
            justify={"center"}
            alignItems={"flex-end"}
          >
            <img src={image} alt={name} className={card.image} />
          </Grid>
        </Grid>
      </div>

      <DetailedCard
        handleCloseModal={handleCloseModal}
        modalIsOpen={modalIsOpen}
        pokemon={pokemonDetail}
        typeColor={typeColor()}
        speciesDetail={speciesDetail}
      />
    </>
  );
}

export default OverviewCard;
