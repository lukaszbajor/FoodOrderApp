// // import { Button } from "../UI/Button/Button";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// // 	faTrash,
// // 	faPlus,
// // 	faMinus,
// // 	faList,
// // } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import {
// // 	calculateTotalValue,
// // 	incrementItemCount,
// // 	decrementItemCount,
// // 	removeFromCart,
// // } from "../../store/features/cart/cartSlice";

// import styles from "./Cart.module.scss";

// function CartItemDetails({ item }) {
// 	const [selectedOption, setSelectedOption] = useState("");
// 	const [selectedOptions, setSelectedOptions] = useState({});
// 	const [showDetails, setShowDetails] = useState(false);
// 	const cartItems = useSelector((state) => state.cart.cart);
// 	const dispatch = useDispatch();

// 	return (
// 		<div className={styles.cart__details}>
// 			{(item.category === "pizza" || item.category === "fries") && (
// 				<>
// 					<div>
// 						<h4>Sosy:</h4>
// 						<h6>Dołączone do każdej pizzy - za darmo!</h6>
// 						<select name="" id="">
// 							<option value="" selected disabled>
// 								Wybierz
// 							</option>
// 							<option value="">Ketchup</option>
// 							<option value="">Czosnkowy</option>
// 							<option value="">Meksykański</option>
// 							<option value="">Mix</option>
// 						</select>
// 					</div>
// 					<div>
// 						<h4>Sos firmowy(+4zł):</h4>
// 						<h6>Autorski sos - tajemna receptura</h6>
// 						<select name="" id="">
// 							<option value="" selected disabled>
// 								Wybierz
// 							</option>
// 							<option value="">Tak</option>
// 							<option value="">Nie</option>
// 						</select>
// 					</div>
// 				</>
// 			)}
// 		</div>
// 	);
// }

// export default CartItemDetails;
