import {
	updateCountItem,
	calculateTotalValue,
	incrementItemCount,
	decrementItemCount,
} from "../../store/features/cart/cartSlice";
import { Button } from "../UI/Button/Button";
import styles from "./Cart.module.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faPlus,
	faMinus,
	faGear,
} from "@fortawesome/free-solid-svg-icons";

function Cart() {
	const [showDetails, setShowDetails] = useState(false);
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart); // pobieramy tablicę cart ze stanu Redux
	const totalValueCart = useSelector((state) => state.cart.totalValue);
	const cartLength = cart.length;

	function handleIncrementCount(mealId, mealPrice, mealCount) {
		dispatch(incrementItemCount({ mealId, mealPrice }));
		dispatch(calculateTotalValue());
		// console.log(mealId, mealPrice, mealCount);
	}
	function handleDecrementCount(mealId, mealPrice, mealCount) {
		dispatch(decrementItemCount({ mealId, mealPrice }));
		dispatch(calculateTotalValue());
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
					Wartość koszyka: <strong>{totalValueCart.toFixed(2)}zł</strong>
				</p>
			</div>
			<div className={styles.cart__items}>
				{cartLength === 0 ? (
					<p>Brak produktów w koszyku.</p>
				) : (
					<ul className={styles.cart__list}>
						{cart.map((item, index) => (
							<li className={styles.cart__wrapper} key={index}>
								<div className={styles.cart__item}>
									<p>{item.name}</p>
									<p>{item.price}</p>
									<div className={styles.cart__btns}>
										<Button
											className={styles.cart__btn}
											onClick={() =>
												handleIncrementCount(item.id, item.price, item.count)
											}
										>
											<FontAwesomeIcon icon={faPlus} />
										</Button>
										<p className={styles.cart__itemCount}>{item.count}</p>

										<Button
											className={styles.cart__btn}
											onClick={() =>
												handleDecrementCount(item.id, item.price, item.count)
											}
										>
											<FontAwesomeIcon icon={faMinus} />
										</Button>
									</div>
								</div>
								<div className={styles.cart__options}>
									<div
										className={styles.cart__r}
										onClick={() => setShowDetails(!showDetails)}
									>
										<FontAwesomeIcon
											icon={faGear}
											className={styles.cart__settingsIcon}
										/>
									</div>
									<Button className={styles.cart__removeBtn}>
										<FontAwesomeIcon icon={faTrash} />
									</Button>
								</div>
								{showDetails && (
									<div className={styles.cart__details}>
										Dodatkowe opcje zamówienia.
									</div>
								)}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Cart;
