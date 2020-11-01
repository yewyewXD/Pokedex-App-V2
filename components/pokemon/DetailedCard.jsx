import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const modalStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    background: "white",
    border: "none",
    outline: "none",
    padding: "20px",
  },
  image: {
    width: "100px",
    height: "100px",
  },
});

const modalDetailStyles = makeStyles({
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
}) {
  const modal = modalStyles();
  const modalDetail = modalDetailStyles();

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
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={modalIsOpen}>
        <div className={modal.content}>
          <span onClick={handleCloseModal}>x</span>

          <img src={pokemon.image} alt="" className={modal.image} />

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
      </Fade>
    </Modal>
  );
}
