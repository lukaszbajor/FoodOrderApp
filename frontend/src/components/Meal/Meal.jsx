// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	calculateTotalValue,
	updateCountItem,
} from "../../store/features/cart/cartSlice";
import styles from "./Meal.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Meal({ meal }) {
	const dispatch = useDispatch();
	const sizes = meal.sizes.split(",");
	const prices = meal.prices.split(",").map((price) => parseFloat(price));
	const cart = useSelector((state) => state.cart.cart);

	const addToCartHandler = (mealId, mealName, mealPrice) => {
		const checkItem = cart.find(
			(item) =>
				item.id === mealId && item.name === mealName && item.price === mealPrice
		);

		if (checkItem) {
			dispatch(updateCountItem({ mealId, mealPrice, mealCount: 1 }));
			// dispatch(updateCountItem({ id: idMeal, count: checkItem.count + 1 }));
			console.log("checkitem:" + checkItem);
			dispatch(calculateTotalValue());
		} else {
			dispatch(
				addToCart({ id: mealId, name: mealName, price: mealPrice, count: 1 })
			);
			dispatch(calculateTotalValue());
		}
	};
	function xd() {
		console.log(cart);
	}
	xd();

	return (
		<li className={styles.meal}>
			<h3 className={styles.meal__name}>{meal.name}</h3>
			<img src="" alt="" className={styles.meal__img} />
			<p className={styles.meal__ingredients}>{meal.ingredients}</p>
			<div className={styles.meal__sizeBox}>
				{sizes.map((size, index) => (
					<div className={styles.meal__sizeItem} key={index}>
						{size === "small" ? (
							<p className={styles.meal__sizeType}>Mały/a</p>
						) : size === "medium" ? (
							<p className={styles.meal__sizeType}>Średnia/i</p>
						) : (
							<p className={styles.meal__sizeType}>Duża/y</p>
						)}
						{/* <div> */}
						<Button
							className={styles.meal__btn}
							onClick={() =>
								addToCartHandler(meal.id, meal.name, prices[index])
							}
						>
							<p className={styles.meal__sizePrice}>
								{parseFloat(prices[index]).toFixed(2)} zł
							</p>
							<FontAwesomeIcon
								icon={faCartShopping}
								className={styles.meal__cartIcon}
							/>
						</Button>
						{/* </div> */}
					</div>
				))}
			</div>
			<p className={styles.meal__description}>{meal.description}</p>
			<hr />
		</li>
	);
}

export default Meal;
