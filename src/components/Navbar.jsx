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
    flexGrow: 1,
  },
  navbar__title: {
    flexGrow: 1,
  },
  navbar__menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function ButtonAppBar() {
  const navbarStyles = NavbarStyles();

  return (
    <div className={navbarStyles.navbar}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={navbarStyles.navbar__menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={navbarStyles.navbar__title}>
            News
          </Typography>
          <Button color="inherit">Github</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
