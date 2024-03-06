import { Button } from "../UI/Button/Button";
import styles from "./Header.module.scss";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import logo from "../../assets/images/logoburger.png";

function Header() {
	// const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	// const user = useSelector((state) => state.auth.user);
	return (
		<header className={styles.header}>
			<div className={styles.header__wrap}>
				<p className={`${styles.header__text} ${styles["header__text--name"]}`}>
					Food Order App
				</p>
				<h1 className={styles.header__title}>
					Mamy sposób na... <br /> Dużego głoda!
				</h1>
				<p className={styles.header__text}>
					Najlepiej oceniane jedzenie w całej okolicy!
				</p>
				{/* <div className={styles.header__features}>
				<div className={styles.header__feature}>C1</div>
				<div className={styles.header__feature}>C2</div>
				<div className={styles.header__feature}>C3</div>
			</div> */}
				<Button className={styles.header__orderBtn}>Zamówienie online!</Button>
			</div>
		</header>
	);
}

export default Header;
