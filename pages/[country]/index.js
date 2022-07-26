import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Head from "next/head";
import styles from "../../styles/country.module.css"
import Link from "next/link"
import {AiOutlineArrowLeft} from "react-icons/ai"
import Loader from "../../components/Loader/Loader";

const Country = (props) => {

  const [country, setCountry] = useState(props.info[0]) 

  const router = useRouter()


    const officialName = country?.name?.official
    const displayedName = officialName[Object.keys(officialName)[0]].official ?? officialName
    const officialCurrencie = country?.currencies ? country.currencies[Object.keys(country.currencies)[0]] : "no currencie"
    const officialLanguages = country?.languages?  Object?.values(country?.languages) : "no language"
    const capital = country?.capital === undefined? "none" : country?.capital[0]
    const currencieCheck = officialCurrencie === "no currencie" ? officialCurrencie : `${officialCurrencie.name} ${officialCurrencie.symbol}`
    const handleClick = (e) => {
      router.push(e)

    } 

    useEffect(() => {
      setCountry(props.info[0])
    })
    const borders = !country.borders ? "no borders" : props.borderInfo.map(border => <button className={ `theme__bg strong__header ${styles.btnborder}`} key={border.cca3} onClick={() => handleClick(border.name.common.replaceAll(" ", "-"))}>{border.cca3}</button>)
  if(props.info){
    return (
      <main className={styles.country__container}>
      <Head>
        <title>{officialName}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Link href="/" className={styles.cursor}><button  className={ `theme__bg strong__header ${styles.country__btn}`}><AiOutlineArrowLeft /> Back</button></Link>
        <section className={styles.country__content}>
          <figure className={styles.imgFlag__container}>
            <img src={country.flags.svg} alt={country.name.common} className={styles.imgFlag} />
          </figure>
          <article className={styles.details}>
          <h1 className={`strong__header ${styles.details__name}`}>{country.name.common}</h1>
          <div className={styles.details__container}>
            <ul>
              <li><span className={styles.bold}>Native Name:</span> {displayedName}</li>
              <li><span className={styles.bold}>Population:</span> {country.population}</li>
              <li><span className={styles.bold}>Region:</span> {country.region}</li>
              <li><span className={styles.bold}>Sub Region:</span> {country.subregion}</li>
              <li><span className={styles.bold}>Capital:</span> {capital}</li>
            </ul>
            <ul>
              <li><span className={styles.bold}>Top Level Domain:</span> {country.tld ? country.tld[0] : "no main domain" }</li>
              <li><span className={styles.bold}>Currencies:</span> {currencieCheck}</li>
              <li><span className={styles.bold}>Languages:</span> {officialLanguages !== "no language" ? officialLanguages.join(", ") : officialLanguages}</li>
            </ul>
          </div>
          <div className={styles.border__container}>
           <span className={styles.bold}>Border Countries:</span>
            <span className={`${styles.borders__container}`}>{borders}</span>
          </div>
          </article>
        </section>
      </main>
    )
  }
  return <main className={styles.container}><Loader /></main>
}

export default Country

const getAllCountries = async (header = "all") => {
  const res = await fetch(`https://restcountries.com/v3.1/${header}`)
  const data = await res.json()
  return data
}
/* encontrar y pasar como prop los nombres de los paises que comparten fronteras */
export async function getStaticProps(context) {
  
  const data = await getAllCountries()
  const fullName = context.params.country.replaceAll("-", " ")
  const match = data.filter(e => e.name.common.includes(fullName) === true || e.name.common.includes(context.params.country) )
  const borders = match[0]?.borders ?? "no border"
  const borderCountryName = await data.filter(e => {
    if(borders?.includes(e.cca3)){
      return {cca3: e.cca3, name : e.name.common}
    }
  })
  return {
    props: {
      info: match,
      borderInfo: borderCountryName
    }
  }
}

export async function getStaticPaths() {
  const data = await getAllCountries()

  const countriesNames = await data.map( e => ({params: {country: e.name.common.replaceAll(" ","-")}}))
  return {
    paths: countriesNames,
    fallback: false // See the "fallback" section below
  };
}