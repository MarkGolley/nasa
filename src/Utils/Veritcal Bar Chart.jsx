import * as React from "react";
import { Chart } from "react-google-charts";

const chartEvents = [
  {
    eventName: "select",
    callback({ chartWrapper }) {
      console.log("Selected ", chartWrapper.getChart().getSelection());
    },
  },
];
const data = [
  ["year", "count"],
  [2012, 0],
  [2013, 5.5],
  [2014, 14],
  [2015, 5],
  [2016, 3.5],
  [2017, 7],
];

const options = {
  title: "Meteorites identified per year",
  hAxis: { title: "Year", viewWindow: { min: 2012, max: 2017 } },
  vAxis: { title: "Count", viewWindow: { min: 0, max: 15 } },
  legend: "none",
};
const ExampleChart = () => {
  return (
    <Chart
      chartType="LineChart"
      data={data}
      options={options}
      graphID="LineChart"
      width="100%"
      height="400px"
      chartEvents={chartEvents}
    />
  );
};

export default ExampleChart;
