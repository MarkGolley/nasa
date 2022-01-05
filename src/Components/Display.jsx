import React, { useEffect, useState } from "react";
import ExampleChart from "../Utils/Veritcal Bar Chart";
import { data } from "../Utils/Veritcal Bar Chart";
import styles from "./Display.module.css";

const Display = ({ startYear, endYear }) => {
  const [meteorites, setMeteorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://data.nasa.gov/resource/gh4g-9sfh.json?$where=year%3E%27${startYear}%27and%20year%3C%27${endYear}%27`
    )
      .then((response) => response.json())
      .then((body) => {
        setMeteorites(body);
        setIsLoading(false);
      })
      .catch((err) => setIsError(true));
  }, [startYear, endYear]);

  return (
    <section>
      {isError ? <p>woops! there was an error!</p> : null}
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          <p className={styles.header}>Search results</p>
          <ul>
            {meteorites.map((meteorite) => (
              <li key={meteorite.id}>{meteorite.name}</li>
            ))}
          </ul>
          <p>{ExampleChart()}</p>
        </>
      )}
    </section>
  );
};

export default Display;
