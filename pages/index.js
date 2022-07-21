import { useState } from 'react'
import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar/SearchBar'
import Card from '../components/Card/Card'
import Loader from '../components/Loader/Loader'

/* sticky navbar
   smooth transitions  */

export default function Home(props) {
  const [displayed, setDislayed] = useState(props.countries)

  const [pageNumber, setPageNumber] = useState(1)
  const perPage = 8

  if(props.countries.length >= 8) {
    return (
      <>
      <main className={styles.container}>
        <SearchBar allCountries={props.countries} setDisplayed={setDislayed} setPageNumber={setPageNumber} displayed={displayed}/>
        <ul className={styles.countries__grid}>
        {displayed.slice(0,pageNumber * perPage).map((country, index) => {

          return <li key={index}><Card country={country} /></li>
        })}
        </ul>
  
        {displayed.length > perPage && (pageNumber * perPage) < displayed.length && <button className={styles.home__btn} onClick={() => setPageNumber(pageNumber + 1)}>load more</button>}
      </main>
      
      </>
    )
  }

  return <main className={styles.container__loader}><Loader /></main>
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