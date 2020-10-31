import { makeStyles, Grid } from "@material-ui/core";
export default function OverviewCard({ id, name, types, image }) {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      width: "400px",
      minHeight: "180px",
      padding: "30px 20px",
      borderRadius: "20px 5px",
    },
    title: {
      fontSize: "1.8rem",
    },
    label: {
      width: "100px",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      padding: "3px",
      margin: "5px 0",
      borderRadius: "20px",
    },
    image: {
      position: "absolute",
      height: "100px",
      width: "100px",
      marginLeft: "-15px",
    },
  });

  const typeColor = () => {
    switch (types[0]) {
      case "normal":
        return "#A8A77A";
      case "fire":
        return "#EE8130";
      case "water":
        return "#6390F0";
      case "electric ":
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

  const card = useStyles();

  return (
    <div key={id} className={card.root} style={{ background: typeColor() }}>
      <Grid container style={{ height: "100%" }}>
        <Grid
          item
          container
          xs={8}
          alignItems={"flex-start"}
          justify={"flex-start"}
          direction="column"
        >
          <div className={card.title}>{name}</div>

          {types.map((type, index) => (
            <div key={index} className={card.label}>
              {type}
            </div>
          ))}
        </Grid>

        <Grid item container xs={4} justify={"center"} alignItems={"flex-end"}>
          <img src={image} alt={name} className={card.image} />
        </Grid>
      </Grid>
    </div>
  );
}
