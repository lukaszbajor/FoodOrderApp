import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";

function Cart() {
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
								<p>{item.count}</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Cart;
