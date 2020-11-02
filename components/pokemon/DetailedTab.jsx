import { useState } from "react";
import { Tabs, Tab, makeStyles, createStyles } from "@material-ui/core";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div style={{ marginTop: "30px" }}>{children}</div>}
    </div>
  );
}

const TabStyles = makeStyles(
  createStyles({
    tab: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const ModalDetailStyles = makeStyles({
  modalDetail__container: {
    padding: "10px 0",
    fontWeight: "bold",
  },
  modalDetail__title: {
    minWidth: "60px",
    marginRight: "10px",
    color: "grey",
  },
});

export default function DetailedTab({ pokemon, speciesDetail }) {
  const tabStyles = TabStyles();
  const modalDetailStyles = ModalDetailStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function textCapitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <div>
      <div className={tabStyles.tab}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="About" />
          <Tab label="Stats" />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        Item About
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={modalDetailStyles.modalDetail__container}>
          <span className={modalDetailStyles.modalDetail__title}>Weight:</span>
          {+pokemon.weight / 10} kg
        </div>

        <div className={modalDetailStyles.modalDetail__container}>
          <span className={modalDetailStyles.modalDetail__title}>Height:</span>
          {+pokemon.height / 10} m
        </div>

        <div className="stats">
          {pokemon.stats.map((stat, index) => (
            <div
              className={modalDetailStyles.modalDetail__container}
              key={index}
            >
              <span className={modalDetailStyles.modalDetail__title}>
                {textCapitalize(stat.stat.name)}:
              </span>
              {stat.base_stat}
            </div>
          ))}
        </div>
      </TabPanel>
    </div>
  );
}
