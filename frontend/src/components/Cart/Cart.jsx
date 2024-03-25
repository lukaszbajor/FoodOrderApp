import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import {
	setCartItems,
	calculateTotalValue,
} from "../../store/features/cart/cartSlice";
import { useEffect } from "react";
import axios from "axios";

function Cart() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart); // pobieramy tablicę cart ze stanu Redux
	const totalValueCart = useSelector((state) => state.cart.totalValue);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const cartLength = cart.length;

	useEffect(() => {
		if (isAuthenticated) {
			axios
				.get("http://localhost:5000/usercart")
				.then((response) => {
					dispatch(setCartItems(response.data.cartItems));
					dispatch(calculateTotalValue());
					console.log(response.data.cartItems);
				})
				.catch((error) => {
					console.error("Błąd podczas pobierania koszyka:", error);
				});
		}
	}, [dispatch, isAuthenticated]);

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
							<CartItem key={index} item={item} />
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Cart;
