import styles from "../../styles/navbar.module.css"
import {BsMoon, BsFillMoonFill} from "react-icons/bs"
const Navbar = () => {
  return (
    <nav className={`${styles.navbar} ${styles.light_border}`}>
        <h1 className={styles.logo}>Where in the world?</h1>
        <button className={styles.toggleTheme}>
            <i className={styles.toggleTheme__icon}><BsMoon/></i>
            <span>dark theme</span>
        </button>
    </nav>
  )
}
export default Navbar