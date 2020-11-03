import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const NavbarStyles = makeStyles((theme) => ({
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
  },
  navbar__title: {
    flexGrow: 1,
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  // navbar__menuButton: {
  //   marginRight: theme.spacing(2),
  // },
}));

export default function Navbar() {
  const navbarStyles = NavbarStyles();

  return (
    <div className={navbarStyles.navbar}>
      <AppBar style={{ padding: "0 48px" }}>
        <Toolbar style={{ padding: 0 }}>
          {/* <IconButton
            edge="start"
            className={navbarStyles.navbar__menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <div className={navbarStyles.navbar__title}>Pokedex V2</div>
          <Button color="inherit">Github</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
