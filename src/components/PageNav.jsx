import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      {/* Toggle checkbox */}
      <input type="checkbox" id="menu-toggle" className={styles.toggle} />

      {/* Hamburger */}
      <label htmlFor="menu-toggle" className={styles.hamburger}>
        <span></span>
        <span></span>
        <span></span>
      </label>

      <ul className={styles.menu}>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
