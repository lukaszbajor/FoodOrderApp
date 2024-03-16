import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
	totalValue: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const { id, name, price, count } = action.payload;
			state.cart.push({ id, name, price, count });
		},
		updateCountItem: (state, action) => {
			// state.cart = action.payload;
			const { mealId, mealPrice, mealCount } = action.payload;
			state.cart = state.cart.map((item) =>
				item.id === mealId && item.price === mealPrice
					? { ...item, count: item.count + mealCount }
					: item
			);
			console.log(typeof mealCount);
		},
		calculateTotalValue: (state) => {
			state.totalValue = state.cart.reduce((total, item) => {
				return total + item.price * item.count;
			}, 0);
		},
		incrementItemCount: (state, action) => {
			const { mealId, mealPrice } = action.payload;
			const itemToUpdate = state.cart.find(
				(item) => item.id === mealId && item.price === mealPrice
			);
			if (itemToUpdate) {
				itemToUpdate.count += 1;
			}
		},
		decrementItemCount: (state, action) => {
			const { mealId, mealPrice } = action.payload;
			const itemToUpdate = state.cart.find(
				(item) => item.id === mealId && item.price === mealPrice
			);
			if (itemToUpdate && itemToUpdate.count > 1) {
				itemToUpdate.count -= 1;
			}
		},

		// updateCountItem: (state, action) => {
		// 	const { id, count } = action.payload;
		// 	const itemToUpdate = state.cart.find((item) => item.id === id);
		// 	if (itemToUpdate) {
		// 		itemToUpdate.count = count;
		// 	}
		// },
		removeFromCart(state) {},
	},
});

export const {
	addToCart,
	updateCountItem,
	removeFromCart,
	calculateTotalValue,
	incrementItemCount,
	decrementItemCount,
} = cartSlice.actions;
export default cartSlice.reducer;
