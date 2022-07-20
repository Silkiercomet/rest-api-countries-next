import { useState, useRef, useEffect } from "react";
import styles from "../../styles/searchbar.module.css";
import { BsSearch } from "react-icons/bs";
const SearchBar = ({ allCountries, setDisplayed, setPageNumber }) => {
  const [input, setInput] = useState("");
  const [render, setRender] = useState(false);
  const selectRef = useRef("Filter by region");

  const filterByRegions = (region) => {
    switch (region) {
      case "Filter by region":
        return allCountries;

      case "Africa":
        return allCountries.filter((country) => country.region === "Africa");

      case "America":
        return allCountries.filter((country) => country.region === "Americas");

      case "Asia":
        return allCountries.filter((country) => country.region === "Asia");

      case "Europea":
        return allCountries.filter((country) => country.region === "Europe");

      case "Oceania":
        return allCountries.filter((country) => country.region === "Oceania");

      default:
        return allCountries;
    }
  };
  useEffect(() => {
    if (input !== "") {
      let count = allCountries.filter((c) =>
        c.name.common
          .toLowerCase()
          .slice(0, input.length)
          .includes(input.toLocaleLowerCase())
      );
      setPageNumber(1);
      console.log(count);
      return setDisplayed(count);
    }
    setPageNumber(1);
    setDisplayed(filterByRegions(selectRef.current.value));
  }, [input, render]);
  const filterOptions = [
    "Filter by region",
    "Africa",
    "America",
    "Asia",
    "Europea",
    "Oceania",
  ];
  return (
    <menu className={styles.menu}>
      <li className={`light-bg-element ${styles.menu__input}`}>
        <BsSearch />
        <input
          type="text"
          value={input}
          className={"light-bg-element light"}
          placeholder="Search for a country"
          onChange={(e) => setInput(e.target.value)}
        />
      </li>
      <li className={`light-bg-element ${styles.menu__select}`}>
        <select
          name="Filter by Region"
          ref={selectRef}
          className={"light-bg-element light"}
          onChange={(e) => {
            setDisplay(regions[e.target.value]?.());
            setRender(!render);
          }}
        >
          {filterOptions.map((opt, index) => (
            <option value={opt} key={index}>
              {opt}
            </option>
          ))}
        </select>
      </li>
    </menu>
  );
};

export default SearchBar;
