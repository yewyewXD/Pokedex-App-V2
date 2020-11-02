import { createStyles, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import DetailedTab from "./DetailedTab";

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
      height: "220px",
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
});

export default function DetailedCard({
  handleCloseModal,
  modalIsOpen,
  pokemon,
  typeColor,
  speciesDetail,
}) {
  const modal = modalStyles();
  const modalDetail = modalDetailStyles();
  const modalHeadline = modalHeadlineStyles();

  function textCapitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  if (modalIsOpen) {
    console.log(pokemon);
    if (speciesDetail) {
      console.log(speciesDetail);
    }
  }

  return (
    <Modal
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
              <KeyboardBackspaceIcon fontSize="large" />
            </span>

            <div className={modalHeadline.root}>
              <span className={modalHeadline.title}>
                {textCapitalize(pokemon.name)}
              </span>
              <span className={modalHeadline.subtitle}>#{pokemon.id}</span>
            </div>

            <div
              className={modalHeadline.root}
              style={{ justifyContent: "flex-start" }}
            >
              {pokemon.types.map((type, index) => (
                <span
                  className={modalHeadline.label}
                  key={index}
                  style={{ marginRight: "15px" }}
                >
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
            <DetailedTab pokemon={pokemon} speciesDetail={speciesDetail} />
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
