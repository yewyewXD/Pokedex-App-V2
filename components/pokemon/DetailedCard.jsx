import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function DetailedCard({
  handleCloseModal,
  modalIsOpen,
  pokemonDetail,
}) {
  const modalStyles = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={modalStyles.root}
      open={modalIsOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={modalIsOpen}>
        <div>
          <h2 id="transition-modal-title">Transition modal</h2>
          <p id="transition-modal-description">
            react-transition-group animates me.
          </p>
        </div>
      </Fade>
    </Modal>
  );
}
