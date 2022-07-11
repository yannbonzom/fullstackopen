import CountryView from "./CountryView";

const Countries = ({ countries, filter, setFilter }) => {
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (countriesToShow.length > 10)
    return <p>Too many matches, specify another filter</p>;
  if (countriesToShow.length === 0) return <p>No match, try a new search</p>;
  if (countriesToShow.length > 1) {
    return (
      <>
        {countriesToShow.map((c) => (
          <div key={c.name.common}>
            {c.name.common}{" "}
            <button onClick={() => setFilter(c.name.common)}>show</button>
            <br></br>
          </div>
        ))}
      </>
    );
  }

  return <CountryView country={countriesToShow[0]} />;
};

export default Countries;
