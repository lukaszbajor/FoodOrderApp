import { Button } from "../UI/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTrash,
	faPlus,
	faMinus,
	faList,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
	calculateTotalValue,
	incrementItemCount,
	decrementItemCount,
} from "../../store/features/cart/cartSlice";

import styles from "./Cart.module.scss";

function CartItem({ item }) {
	const [showDetails, setShowDetails] = useState(false);
	const dispatch = useDispatch();
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
		<li className={styles.cart__wrapper}>
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
						icon={faList}
						className={styles.cart__settingsIcon}
					/>
				</div>
				<Button className={styles.cart__removeBtn}>
					<FontAwesomeIcon icon={faTrash} />
				</Button>
			</div>
			{showDetails && (
				<div className={styles.cart__details}>Dodatkowe opcje zamówienia.</div>
			)}
		</li>
	);
}

export default CartItem;
