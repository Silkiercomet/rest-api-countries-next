import styles from "../../styles/navbar.module.css"
import {BsMoon, BsFillMoonFill} from "react-icons/bs"
import { useState, useEffect } from "react"
const Navbar = () => {
  const [isDark, setIsDark] = useState(false) 
  useEffect(() => {
    if(isDark){
      document.documentElement.style.setProperty("--bg", "hsl(209, 23%, 22%)")
      document.documentElement.style.setProperty("--strong-header", "hsl(0, 0%, 100%)")
      document.documentElement.style.setProperty("--card-li", "hsl(0, 0%, 100%)")
      document.documentElement.style.setProperty("--VeryLightGray", "hsl(207, 26%, 17%)")
      return
    }
    document.documentElement.style.setProperty("--bg", "hsl(0, 0%, 100%)")
    document.documentElement.style.setProperty("--strong-header", "hsl(207, 26%, 17%)")
    document.documentElement.style.setProperty("--card-li", "hsl(0, 0%, 52%)")
    document.documentElement.style.setProperty("--VeryLightGray", "hsl(0, 0%, 98%)")
  }, [isDark])
  return (
    <nav className={`${styles.navbar} ${styles.light_border} theme__bg`}>
        <h1 className={`${styles.logo} strong__header`}>Where in the world?</h1>
        <button className={styles.toggleTheme} onClick={() => setIsDark(!isDark)}>
            {!isDark ?
            <div className={`${styles.toggleTheme_internal} strong__header`}><i className={styles.toggleTheme__icon}><BsFillMoonFill/></i>
            <span>dark theme</span></div>
            : 
            <div className={`${styles.toggleTheme_internal} strong__header`}><i className={styles.toggleTheme__icon}><BsMoon/></i>
            <span>light theme</span></div>}
        </button>
    </nav>
  )
}
export default Navbar