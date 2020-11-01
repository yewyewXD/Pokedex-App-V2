import { createStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { BsArrowLeft } from "react-icons/bs";

const modalStyles = makeStyles(
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 30px",
    },
    content: {
      height: "80vh",
      width: "600px",
      background: "white",
      border: "none",
      outline: "none",
      borderRadius: "20px",
      overflowY: "auto",
    },
    navbar: {
      position: "fixed",
      margin: "40px 0",
      padding: "0 30px",
      color: "white",
    },

    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "180px",
    },
    image: {
      position: "relative",
      marginBottom: "-50px",
      width: "200px",
      height: "200px",
    },
  })
);

const modalHeadlineStyles = makeStyles(
  createStyles({
    root: {
      width: "540px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "15px 0",
      color: "white",
      fontWeight: "bold",
    },
    title: {
      fontSize: "2.3rem",
    },
    subtitle: {
      fontSize: "1.2rem",
    },
    label: {
      fontSize: "0.9rem",
      width: "90px",
      textAlign: "center",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      padding: "5px",
      marginRight: "5px",
      borderRadius: "20px",
    },
  })
);

const modalDetailStyles = makeStyles({
  root: {
    background: "white",
    borderRadius: "20px",
    padding: "30px",
  },
  container: {
    padding: "10px 0",
    fontWeight: "bold",
  },
  title: {
    minWidth: "60px",
    marginRight: "10px",
    color: "grey",
  },
});

export default function DetailedCard({
  handleCloseModal,
  modalIsOpen,
  pokemon,
  typeColor,
}) {
  console.log(typeColor);
  const modal = modalStyles();
  const modalDetail = modalDetailStyles();
  const modalHeadline = modalHeadlineStyles();

  function textCapitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  if (modalIsOpen) {
    console.log(pokemon);
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={modal.root}
      open={modalIsOpen}
      closeAfterTransition
      onClose={handleCloseModal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={modalIsOpen}>
        <div className={modal.content} style={{ background: typeColor }}>
          <div className={modal.navbar}>
            <span onClick={handleCloseModal} style={{ cursor: "pointer" }}>
              <BsArrowLeft fontSize="1.5rem" />
            </span>

            <div className={modalHeadline.root}>
              <span className={modalHeadline.title}>
                {textCapitalize(pokemon.name)}
              </span>
              <span className={modalHeadline.subtitle}>#{pokemon.id}</span>
            </div>

            <div className={modalHeadline.root}>
              {pokemon.types.map((type, index) => (
                <span className={modalHeadline.label} key={index}>
                  {textCapitalize(type.type.name)}
                </span>
              ))}
            </div>
          </div>

          <div style={{ height: "170px" }}></div>

          <div className={modal.imageContainer}>
            <img src={pokemon.image} alt="" className={modal.image} />
          </div>

          <div className={modalDetail.root}>
            <div className={modalDetail.container}>
              <span className={modalDetail.title}>Weight:</span>
              {+pokemon.weight / 10} kg
            </div>

            <div className={modalDetail.container}>
              <span className={modalDetail.title}>Height:</span>
              {+pokemon.height / 10} cm
            </div>

            <div className="stats">
              {pokemon.stats.map((stat, index) => (
                <div className={modalDetail.container} key={index}>
                  <span className={modalDetail.title}>
                    {textCapitalize(stat.stat.name)}:
                  </span>
                  {stat.base_stat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
