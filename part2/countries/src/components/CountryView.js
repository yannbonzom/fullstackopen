import Weather from "./Weather";

const CountryView = ({ country }) => {
  const langs = Object.values(country.languages);
  return (
    <>
      <h1>{country.name.common}</h1>
      capital {country.capital}
      <br></br>
      area {country.area}
      <h3>Languages:</h3>
      <ul>
        {langs.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt=""></img>
      <Weather capital={country.capital} />
    </>
  );
};

export default CountryView;
