import React, { useEffect, useState } from "react";
import ExampleChart from "../Utils/Veritcal Bar Chart";

import styles from "./Display.module.css";

const Display = ({ startYear, endYear }) => {
  const [meteorites, setMeteorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [graphOrData, setGraphOrData] = useState(false);

  const [data, setData] = useState([
    ["year", "count"],
    [2012, 15],
    [2013, 5.5],
    [2014, 14],
    [2015, 5],
    [2016, 3.5],
    [2017, 7],
  ]);

  const [options, setOptions] = useState({
    title: "Meteorites identified per year",
    hAxis: { title: "Year", viewWindow: { min: 2012, max: 2017 } },
    vAxis: { title: "Count", viewWindow: { min: 0, max: 25 } },
    legend: "none",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://data.nasa.gov/resource/gh4g-9sfh.json?$where=year%3E%27${startYear}%27and%20year%3C%27${endYear}%27&$limit=10000`
    )
      .then((response) => response.json())
      .then((body) => {
        setMeteorites(body);
        setIsLoading(false);

        const years = body.map((meteorite) => meteorite.year.split("-")[0]);

        const uniq = [...new Set(years)];

        let result = [];
        let max = 25;
        const countOccurrences = (arr, val) =>
          arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

        for (let i = 0; i < uniq.length; i++) {
          result.push([parseInt(uniq[i]), countOccurrences(years, uniq[i])]);
          if (countOccurrences(years, uniq[i]) > max) {
            max = countOccurrences(years, uniq[i]);
          }
        }
        result.unshift(["year", "count"]);

        setData(result);
        console.log(result);
        setOptions({
          title: "Meteorites identified per year",
          hAxis: {
            title: "Year",
            viewWindow: {
              min: parseInt(Math.round(uniq[0])),
              max: parseInt(Math.round(uniq[uniq.length - 1])),
            },
          },
          vAxis: {
            title: "Count",
            viewWindow: { min: 0, max: max },
          },
          legend: "none",
        });
      })
      .catch((err) => setIsError(true));
  }, [startYear, endYear]);

  const handleSubmit = (event) => {
    if (graphOrData === false) {
      setGraphOrData(true);
    }
    if (graphOrData === true) {
      setGraphOrData(false);
    }
  };

  return (
    <section className={styles.results}>
      <p className={styles.header}>Search results</p>
      <button onClick={handleSubmit}>
        Click to switch between data or graph
      </button>
      {isError ? <p>woops! there was an error!</p> : null}
      {isLoading ? (
        <p>Loading....</p>
      ) : graphOrData ? (
        <p>{ExampleChart(data, options)}</p>
      ) : (
        <>
          <ul className={styles.table}>
            {meteorites.map((meteorite) => (
              <li key={meteorite.id} className={styles.inner}>
                {meteorite.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Display;
