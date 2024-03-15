// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	updateCountItem,
} from "../../store/features/cart/cartSlice";
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
	const cart = useSelector((state) => state.cart.cart);

	const addToCartHandler = (mealId, mealName, mealPrice) => {
		const checkItem = cart.find(
			(item) =>
				item.id === mealId && item.name === mealName && item.price === mealPrice
		);

		if (checkItem) {
			dispatch(updateCountItem({ mealId, mealPrice }));
			// dispatch(updateCountItem({ id: idMeal, count: checkItem.count + 1 }));
			console.log("checkitem:" + checkItem);
		} else {
			dispatch(
				addToCart({ id: mealId, name: mealName, price: mealPrice, count: 1 })
			);
		}
	};
	function xd() {
		console.log(cart);
	}
	xd();

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
						<button
							onClick={() =>
								addToCartHandler(meal.id, meal.name, prices[index])
							}
						>
							{parseFloat(prices[index]).toFixed(2)} zł
						</button>
					</p>
				))}
			</div>
		</li>
	);
}

export default Meal;
