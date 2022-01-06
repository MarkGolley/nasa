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

const ExampleChart = (data, options) => {
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
