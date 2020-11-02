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

const ModalDetailStyles = makeStyles(
  createStyles({
    modalDetail__container: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "12px 0",
      fontWeight: "bold",
    },
    modalDetail__title: {
      marginRight: "10px",
      color: "grey",
    },
    modalDetail__boxContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px 30px",
      boxShadow: "lightgrey 0 5px 10px",
      borderRadius: "20px",
      maxWidth: "300px",
      margin: "0 auto",
      marginBottom: "30px",
    },
    modalDetail__boxItem: {
      display: "flex",
      flexDirection: "column",
      fontWeight: "bold",
      margin: "0 30px",
    },
    modalDetail__boxItem__title: {
      color: "grey",
      marginBottom: "5px",
    },
    modalDetail__boxItem__subtitle: {},
  })
);

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

      {speciesDetail && (
        <TabPanel value={value} index={0}>
          <div style={{ fontWeight: "bold", marginBottom: "30px" }}>
            {speciesDetail.description}
          </div>

          <div className={modalDetailStyles.modalDetail__boxContainer}>
            <div className={modalDetailStyles.modalDetail__boxItem}>
              <span className={modalDetailStyles.modalDetail__boxItem__title}>
                Weight:
              </span>
              <span
                className={modalDetailStyles.modalDetail__boxItem__subtitle}
              >
                {+pokemon.weight / 10} kg
              </span>
            </div>

            <div className={modalDetailStyles.modalDetail__boxItem}>
              <span className={modalDetailStyles.modalDetail__boxItem__title}>
                Height:
              </span>
              <span
                className={modalDetailStyles.modalDetail__boxItem__subtitle}
              >
                {+pokemon.height / 10} m
              </span>
            </div>
          </div>

          <div className={modalDetailStyles.modalDetail__container}>
            <span className={modalDetailStyles.modalDetail__title}>
              Egg Group:
            </span>
            {textCapitalize(speciesDetail.eggGroups)}
          </div>
          <div className={modalDetailStyles.modalDetail__container}>
            <span className={modalDetailStyles.modalDetail__title}>
              Growth Rate:
            </span>
            {textCapitalize(speciesDetail.growthRate)}
          </div>
        </TabPanel>
      )}

      <TabPanel value={value} index={1}>
        <div className="stats">
          {pokemon.stats.map((stat, index) => (
            <div
              className={modalDetailStyles.modalDetail__container}
              key={index}
            >
              <div
                className={modalDetailStyles.modalDetail__title}
                style={{ width: "220px" }}
              >
                {textCapitalize(stat.stat.name)}:
              </div>
              <span
                style={{
                  marginRight: "30px",
                  width: "40px",
                  textAlign: "center",
                }}
              >
                {stat.base_stat}
              </span>

              <div
                style={{
                  width: "100%",
                  height: "10px",
                  borderRadius: "20px",
                  background: "lightgrey",
                }}
              >
                <div
                  style={{
                    height: "10px",
                    background: `${+stat.base_stat > 50 ? "green" : "red"}`,
                    width: `${+stat.base_stat > 100 ? "100" : stat.base_stat}%`,
                    borderRadius: "20px",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </TabPanel>
    </div>
  );
}
