import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar/SearchBar'
import Card from '../components/Card/Card'
import Loader from '../components/Loader/Loader'

/*cambiar el contexto por solo usar el props, y filtrar el pais necesitado a traves del link name */

export default function Home(props) {
  const [displayed, setDislayed] = useState(props.countries)
  // const {setCountry,allCountries,setAllCountries} = useContext(CountryContext)
  const [pageNumber, setPageNumber] = useState(1)
  const perPage = 8

  if(props.countries.length >= 8) {
    return (
      <>
      <main className={styles.container}>
        <SearchBar allCountries={props.countries} setDisplayed={setDislayed} setPageNumber={setPageNumber}/>
        <ul className={styles.countries__grid}>
        {displayed.slice(0,pageNumber * perPage).map((country, index) => {

          return <li key={index}><Card country={country} /></li>
        })}
        </ul>
  
        
      </main>
      <button onClick={() => setPageNumber(pageNumber + 1)}>load more</button>
      </>
    )
  }

  return <main className={styles.container}><Loader /></main>
}


export async function getStaticProps() {
  const response = await fetch("https://restcountries.com/v3.1/all")
  const data = await response.json()
  return{
    props: {
      countries: data
    }

  }
}