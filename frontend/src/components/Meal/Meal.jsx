// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../UI/Button/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/cart/cartSlice";
import styles from "./Meal.module.scss";
// import {
// 	faCarSide,
// 	faClock,
// 	faLocationDot,
// 	faPhone,
// } from "@fortawesome/free-solid-svg-icons";

function Meal({ meal }) {
	const dispatch = useDispatch();
	const sizes = meal.sizes.split(",");
	const prices = meal.prices.split(",");

	const addToCartHandler = (mealName, mealPrice) => {
		dispatch(addToCart({ name: mealName, price: mealPrice }));
	};

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
						<button onClick={() => addToCartHandler(meal.name, prices[index])}>
							{parseFloat(prices[index]).toFixed(2)} zł
						</button>
					</p>
				))}
			</div>
		</li>
	);
}

export default Meal;
