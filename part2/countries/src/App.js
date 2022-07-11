import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  const filterSearch = (event) => setFilter(event.target.value);

  return (
    <>
      <Search filter={filter} onChange={filterSearch} />
      <Countries countries={countries} filter={filter} setFilter={setFilter} />
    </>
  );
}

export default App;
