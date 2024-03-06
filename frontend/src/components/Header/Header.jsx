import { Button } from "../UI/Button/Button";
import styles from "./Header.module.scss";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import logo from "../../assets/images/logoburger.png";

function Nav() {
	// const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	// const user = useSelector((state) => state.auth.user);
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>Wiamy w naszej restauracji!</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil deserunt
				doloremque ducimus deleniti rem optio, debitis veniam ut quisquam,
				maiores dolorum repellendus accusamus, quasi laborum quibusdam? Eveniet
				aperiam voluptate delectus. Sint alias omnis rem rerum voluptatibus
				expedita ipsam quas, doloribus accusamus sapiente perspiciatis amet
				eaque fuga est ab! Aliquid earum excepturi exercitationem placeat sit,
				dicta in iusto nobis repellendus repudiandae. Aspernatur alias minima
				distinctio perferendis beatae quis eum quaerat quibusdam error neque,
				nam sint, dolor ipsum ullam ab nobis fugit porro. Illo error vel hic,
				odit facilis id quaerat repellat.
			</p>
			<Button>Sprawdź menu</Button>
		</header>
	);
}

export default Nav;
