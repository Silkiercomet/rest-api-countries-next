import Link from "next/link"
const Border = ({border}) => {
  return (
    <Link href={{
        pathname: '/[country]',
        query: { country: border.name.common.replaceAll(" ","-") },
      }}> <button className={ `light-bg-element`} key={border.cca3} >{border.cca3}</button></Link>
  )
}

export default Border