import {
  createStyles,
  makeStyles,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import cn from "classnames";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import DetailedTab from "./DetailedTab";

const ModalStyles = makeStyles(
  createStyles({
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 30px",
    },
    modal__content: {
      height: "80vh",
      width: "600px",
      background: "white",
      border: "none",
      outline: "none",
      borderRadius: "20px",
      overflowY: "auto",
    },
    modal__navbar: {
      position: "fixed",
      margin: "40px 0",
      padding: "0 30px",
      color: "white",
    },

    modal__imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "220px",
    },
    modal__image: {
      position: "relative",
      marginBottom: "-50px",
      width: "200px",
      height: "200px",
    },
    modal__detail: {
      background: "white",
      borderRadius: "20px",
      padding: "30px",
    },
    modal__headline: {
      width: "540px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "15px 0",
      color: "white",
      fontWeight: "700",
    },
    modal__headline__title: {
      fontSize: "2.3rem",
    },
    modal__headline__subtitle: {
      fontSize: "1.2rem",
    },
    modal__headline__label: {
      fontWeight: "600",
      width: "100px",
      textAlign: "center",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      padding: "6px 5px",
      marginRight: "5px",
      borderRadius: "20px",
    },
  })
);

export default function DetailedCard({
  handleCloseModal,
  modalIsOpen,
  pokemon,
  typeColor,
  speciesDetail,
}) {
  const modalStyles = ModalStyles();

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
      className={modalStyles.modal}
      open={modalIsOpen}
      closeAfterTransition
      onClose={handleCloseModal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={modalIsOpen}>
        <div
          className={cn(modalStyles.modal__content, "no-scrollbar")}
          style={{ background: typeColor }}
        >
          <div className={modalStyles.modal__navbar}>
            <span onClick={handleCloseModal} style={{ cursor: "pointer" }}>
              <KeyboardBackspaceIcon fontSize="large" />
            </span>

            <div className={modalStyles.modal__headline}>
              <span className={modalStyles.modal__headline__title}>
                {textCapitalize(pokemon.name)}
              </span>
              <span className={modalStyles.modal__headline__subtitle}>
                #{pokemon.id}
              </span>
            </div>

            <div
              className={modalStyles.modal__headline}
              style={{ justifyContent: "flex-start" }}
            >
              {pokemon.types.map((type, index) => (
                <span
                  className={modalStyles.modal__headline__label}
                  key={index}
                  style={{ marginRight: "15px" }}
                >
                  {textCapitalize(type.type.name)}
                </span>
              ))}
            </div>
          </div>

          <div style={{ height: "170px" }}></div>

          <div className={modalStyles.modal__imageContainer}>
            <img
              src={pokemon.image}
              alt=""
              className={modalStyles.modal__image}
            />
          </div>

          <div className={modalStyles.modal__detail}>
            <DetailedTab pokemon={pokemon} speciesDetail={speciesDetail} />
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
