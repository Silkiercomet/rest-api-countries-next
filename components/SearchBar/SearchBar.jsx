import { useState, useRef } from "react"
import styles from "../../styles/searchbar.module.css"
import {BsSearch} from "react-icons/bs"
const SearchBar = () => {
    const [input, setInput] = useState("")
    const selectRef = useRef()
    
    const filterOptions = ["Filter by region", "Africa", "America", "Asia", "Europea", "Oceania"]
  return (
    <menu className={styles.menu}>
    <li className={`light-bg-element ${styles.menu__input}`}>
      <BsSearch />
      <input type="text" value={input} className={'light-bg-element light'} placeholder='Search for a country' onChange={(e) => setInput(e.target.value)}/>
    </li>
    <li className={ `light-bg-element ${styles.menu__select}`}>
      <select name="Filter by Region" ref={selectRef} className={'light-bg-element light'} >
          {filterOptions.map((opt,index) => <option value={opt} key={index}>{opt}</option>)}
      </select>
    </li>
</menu>
  )
}

export default SearchBar
