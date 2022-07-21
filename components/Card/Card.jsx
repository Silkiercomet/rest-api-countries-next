
import Link from "next/link"
import styles from "../../styles/card.module.css"
import Loader from "../Loader/Loader";

const Card = ({country}) => {


  if(country) {
    const capital = country?.capital === undefined? "none" : country?.capital[0]
    const countryName = country?.name.common.length > 16? `${country?.name.common.slice(0,16)}...`:country?.name.common;
    return (
      <Link href={{
        pathname: '/[country]',
        query: { country: country?.name.common.replaceAll(" ","-") },
      }}>
        <div className={`theme__bg ${styles.card}`}>
          <figure className={styles.flag}>
              <img src={country.flags.svg} alt={country.name.common} className={styles.flag__image}/>
          </figure>
          <article className={styles.content__card}>
          <h2 className="strong__header">{countryName}</h2>
          <ul>
              <li>Population:<span>{country.population}</span></li>
              <li>Region:<span>{country.region}</span></li>
              <li>Capital:<span>{capital}</span></li>
          </ul>
          </article>
        </div>
      </Link>
    )
  }
  return <Loader />
}

export default Card