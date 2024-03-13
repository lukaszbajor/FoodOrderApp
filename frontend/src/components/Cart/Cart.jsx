import { updateCountItem } from "../../store/features/cart/cartSlice";
import { Button } from "../UI/Button/Button";
import styles from "./Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart); // pobieramy tablicę cart ze stanu Redux
	const cartLength = cart.length;

	return (
		<div className={styles.cart}>
			<h3 className={styles.cart__title}>Twój Koszyk</h3>
			<div className={styles.cart__info}>
				<p className={styles.cart__count}>
					Ilość: <strong>{cartLength}</strong>
				</p>
				<p className={styles.cart__value}>
					Wartość koszyka: <strong>347,28zł</strong>
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
										onClick={() =>
											dispatch(
												updateCountItem(
													cart.map((x) =>
														x.id === item.id && x.price === item.price
															? { ...x, count: x.count + 1 }
															: x
													)
												)
											)
										}
									>
										+
									</Button>
									{item.count}
								</p>
								<Button
									onClick={() =>
										dispatch(
											updateCountItem(
												cart.map((x) =>
													x.id === item.id && x.price === item.price
														? { ...x, count: x.count - 1 }
														: x
												)
											)
										)
									}
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
