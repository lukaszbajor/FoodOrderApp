import { Button } from "../UI/Button/Button";
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logoburger.png";

function Nav() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	return (
		<nav className={styles.nav}>
			<Link to="/">
				<div className={styles.nav__logoBox}>
					<img src={logo} alt={logo} className={styles.nav__logo} />
					<p className={styles.nav__title}>Food Order App</p>
				</div>
			</Link>
			<div className={styles.btns}>
				{isAuthenticated === true ? (
					<>
						<div>{user.name} user</div>
					</>
				) : (
					// <>
					<Link to="/login">
						<Button className={styles.nav__btn}>Logowanie</Button>
					</Link>
					// <Link to="/register">
					// 	<Button className={styles.nav__btn}>Rejestracja</Button>
					// </Link>
					// {/* </> */}
				)}
			</div>
		</nav>
	);
}

export default Nav;
