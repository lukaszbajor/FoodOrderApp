import {
	updateCountItem,
	calculateTotalValue,
	incrementItemCount,
	decrementItemCount
} from "../../store/features/cart/cartSlice";
import { Button } from "../UI/Button/Button";
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart); // pobieramy tablicę cart ze stanu Redux
	// const tv = useSelector((state) => state.cart.totalValue);
	const cartLength = cart.length;

	function handleIncrementCount(mealId, mealPrice) {
		dispatch(incrementItemCount({ mealId, mealPrice }));
		// console.log(mealId, mealPrice, mealCount);
	}
	function handleDecrementCount(mealId, mealPrice) {
		dispatch(decrementItemCount({ mealId, mealPrice }));
		// console.log(mealId, mealPrice, mealCount);
	}

	return (
		<div className={styles.cart}>
			<h3 className={styles.cart__title}>Twój Koszyk</h3>
			<div className={styles.cart__info}>
				<p className={styles.cart__count}>
					Ilość: <strong>{cartLength}</strong>
				</p>
				<p className={styles.cart__value}>
					Wartość koszyka: <strong>0zł</strong>
				</p>
			</div>
			<div className={styles.cart__items}>
				{cartLength === 0 ? (
					<p>Brak produktów w koszyku.</p>
				) : (
					<ul>
						{cart.map((item, index) => (
							<li key={index}>
								<p>{item.name}</p>
								<p>{item.price}</p>
								<p>
									<Button
										onClick={() => handleIncrementCount(item.id, item.price)}
									>
										+
									</Button>
									{item.count}
								</p>
								<Button
									onClick={() => handleDecrementCount(item.id, item.price)}
								>
									-
								</Button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Cart;
