import { useState } from "react";
import DatePicker from "react-datepicker";

const Search = ({ setEndYear, setStartYear }) => {
  const StartRange = () => {
    const [startDate, setStartDate] = useState();
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showYearPicker
        dateFormat="yyyy"
      />
    );
  };
  const EndRange = () => {
    const [endDate, setEndDate] = useState();
    return (
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showYearPicker
        dateFormat="yyyy"
      />
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStartYear((currDate) => {
      return event.target[0].value;
    });
    setEndYear((currDate) => {
      return event.target[1].value;
    });
  };

  return (
    <div>
      <p>
        All registered meteorites are shown by default, or you can select a date
        range to analyse.
      </p>
      <form onSubmit={handleSubmit}>
        <label>Start range:{StartRange()}</label>
        <label>End range:{EndRange()}</label>
        <button type="submit">Begin Search</button>
      </form>
      {console.log()}
    </div>
  );
};

export default Search;
