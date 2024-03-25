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
import axios from "axios";

function Meal({ meal }) {
	const dispatch = useDispatch();
	const sizes = meal.sizes.split(",");
	const prices = meal.prices.split(",").map((price) => parseFloat(price));
	const cart = useSelector((state) => state.cart.cart);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);

	const addToCartHandler = (
		mealId,
		mealName,
		mealPrice,
		mealCategory,
		mealSize
	) => {
		const checkItem = cart.find(
			(item) =>
				item.id === mealId && item.name === mealName && item.price === mealPrice
		);

		if (!isAuthenticated) {
			const cartItem = {
				id: mealId,
				name: mealName,
				price: mealPrice,
				category: mealCategory,
				size: mealSize,
				count: 1,
			};
			const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
			const updatedCart = [...storedCart, cartItem];
			localStorage.setItem("cart", JSON.stringify(updatedCart));
			dispatch(addToCart(cartItem));

			if (checkItem) {
				dispatch(updateCountItem({ mealId, mealPrice, mealCount: 1 }));
				// dispatch(updateCountItem({ id: idMeal, count: checkItem.count + 1 }));
				console.log("checkitem:" + checkItem);
				dispatch(calculateTotalValue());
			}
		} else {
			if (checkItem) {
				axios
					.post("http://localhost:5000/cart/update", {
						userId: user.id,
						mealId: mealId,
						mealSize: mealSize,
					})
					.then((response) => {
						// Tutaj wykonaj dalsze działania, np. aktualizację count w Redux store
						console.log("Jest ok!");
					})
					.catch((error) => {
						console.error("Błąd podczas aktualizacji koszyka:", error);
						// Tutaj obsłuż błąd, jeśli zajdzie taka potrzeba
					});

				dispatch(updateCountItem({ mealId, mealPrice, mealCount: 1 }));
				dispatch(calculateTotalValue());
			} else {
				axios.post("http://localhost:5000/cart/add", {
					count: 1,
					userId: user.id,
					mealId: mealId,
					mealSize: mealSize,
					mealPrice: mealPrice,
				});
				console.log(mealSize, mealPrice);
				dispatch(
					addToCart({
						id: mealId,
						name: mealName,
						price: mealPrice,
						category: mealCategory,
						size: mealSize,
						count: 1,
					})
				);
			}
			dispatch(calculateTotalValue());
		}
	};
	function xd() {
		console.log(cart);
		console.log(meal.category);
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
								addToCartHandler(
									meal.id,
									meal.name,
									prices[index],
									meal.category,
									sizes[index]
								)
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
