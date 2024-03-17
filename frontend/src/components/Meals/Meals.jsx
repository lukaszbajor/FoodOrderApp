// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Meal from "../Meal/Meal";
import { Button } from "../UI/Button/Button";
import styles from "./Meals.module.scss";
// import {
// 	faCarSide,
// 	faClock,
// 	faLocationDot,
// 	faPhone,
// } from "@fortawesome/free-solid-svg-icons";

function Meals({ meals }) {
	return (
		<ul className={styles.meals}>
			{meals.map((meal) => (
				<Meal key={meal.id} meal={meal} />
			))}
		</ul>
	);
}

export default Meals;
