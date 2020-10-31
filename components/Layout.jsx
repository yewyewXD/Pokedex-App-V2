import Head from "next/head";
import { makeStyles } from "@material-ui/core";

export default function Layout({ children, title, description }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: "100vh",
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      {children}
    </main>
  );
}
