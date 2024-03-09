import { useState } from "react";
import { Button } from "../UI/Button/Button";
import styles from "./Nav.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/images/logoburger.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartShopping,
	faPizzaSlice,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

function Nav() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const toggleMenu = () => {
		setIsMenuVisible(!isMenuVisible);
	};
	const cart = useSelector((state) => state.cart.cart); // pobieramy tablicę cart ze stanu Redux
	const cartLength = cart.length;
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	return (
		<nav className={styles.nav}>
			<div className={styles.nav__wrap}>
				<Link to="/">
					<div className={styles.nav__logoBox}>
						<img src={logo} alt={logo} className={styles.nav__logo} />
						<p className={styles.nav__title}>Food Order App</p>
					</div>
				</Link>

				<ul
					className={`${styles.nav__list} ${
						isMenuVisible ? styles.showMenu : ""
					}`}
				>
					<li className={styles.nav__item}>O nas</li>
					<li className={styles.nav__item}>Menu</li>
					<li className={styles.nav__item}>Kontakt</li>
				</ul>

				<div className={styles.btns}>
					{isAuthenticated === true ? (
						<>
							<div className={styles.nav__userAccount}>
								<p className={styles.nav__userName}>{user.name}</p>
								<FontAwesomeIcon
									icon={faUser}
									className={styles.nav__userIcon}
								/>
								<Button className={styles.nav__btn}>
									<FontAwesomeIcon
										icon={faCartShopping}
										className={styles.nav__cartIcon}
									/>
								</Button>
							</div>
						</>
					) : (
						<div className={styles.nav__btns}>
							<Link to="/login">
								<Button
									className={`${styles.nav__btn} ${styles["nav__btn--login"]}`}
								>
									Logowanie
								</Button>
							</Link>
							<Button className={styles.nav__btn}>
								<FontAwesomeIcon
									icon={faCartShopping}
									className={styles.nav__cartIcon}
								/>
								<div className={styles.nav__cart}>{cartLength}</div>
							</Button>
							{/* // <Link to="/register">
						// 	<Button className={styles.nav__btn}>Rejestracja</Button>
						// </Link> */}
						</div>
					)}
				</div>
				<div className={styles.nav__burger}>
					<FontAwesomeIcon
						icon={faPizzaSlice}
						className={styles.nav__burgerIcon}
						onClick={toggleMenu}
					/>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
