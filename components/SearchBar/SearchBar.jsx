import { useState, useRef, useEffect } from "react";
import styles from "../../styles/searchbar.module.css";
import { BsSearch } from "react-icons/bs";
const SearchBar = ({ allCountries, setDisplayed, setPageNumber, displayed }) => {
  const [input, setInput] = useState("");
  const [renderSelect, setRenderSelect] = useState(false);
  const [region, setRegion] = useState(allCountries);
  const selectRef = useRef("Filter by region");

  const filterByRegions = (region) => {
    switch (region) {
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
    setPageNumber(1);
    if (input !== "") {
      let count = region.filter((c) =>
        c.name.common
          .toLowerCase()
          .slice(0, input.length)
          .includes(input.toLocaleLowerCase())
      );
      setPageNumber(1);
      return setDisplayed(count);
    }
    setDisplayed(region)
  }, [input]);

  useEffect(() => {
    setPageNumber(1);
    const regions = filterByRegions(selectRef.current.value)
    setDisplayed(regions);
    setRegion(regions)
  }, [renderSelect]);
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
      <li className={`theme__bg ${styles.menu__input}`}>
        <i className="strong__header"><BsSearch /></i>
        <input
          type="text"
          value={input}
          className={"theme__bg strong__header"}
          placeholder="Search for a country"
          onChange={(e) => setInput(e.target.value)}
        />
      </li>
      <li className={`theme__bg ${styles.menu__select}`}>
        <select
          name="Filter by Region"
          ref={selectRef}
          className={"theme__bg strong__header"}
          onChange={(e) => {
            setRenderSelect(!renderSelect);
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
