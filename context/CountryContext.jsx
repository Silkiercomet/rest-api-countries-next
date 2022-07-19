import { createContext, useState } from "react";


const CountryContext = createContext({})

export const CountryProvider = ({children}) => {
    const [country, setCountry] = useState("")
    const [allCountries,setAllCountries] = useState([])
  return (
    <CountryContext.Provider value={{country,setCountry,allCountries,setAllCountries}}>{children}</CountryContext.Provider>
  )
}

export default CountryContext
