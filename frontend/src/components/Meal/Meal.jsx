// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../UI/Button/Button";
import styles from "./Meal.module.scss";
// import {
// 	faCarSide,
// 	faClock,
// 	faLocationDot,
// 	faPhone,
// } from "@fortawesome/free-solid-svg-icons";

function Meal({ meal }) {
	const sizes = meal.sizes.split(",");
	const prices = meal.prices.split(",");
	return (
		<li>
			<p>{meal.name}</p>
			<img src="" alt="" />
			<p>{meal.ingredients}</p>
			<p>{meal.description}</p>
			<div>
				{sizes.map((size, index) => (
					<p key={index}>
						{size === "small"
							? "Mały/a"
							: size === "medium"
							? "Średnia/i"
							: "Duża/y"}
						<button>{parseFloat(prices[index]).toFixed(2)} zł</button>
					</p>
				))}
			</div>
		</li>
	);
}

export default Meal;
