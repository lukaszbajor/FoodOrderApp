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
			const { mealId, mealPrice } = action.payload;
			state.cart = state.cart.map((item) =>
				item.id === mealId && item.price === mealPrice
					? { ...item, count: item.count + 1 }
					: item
			);
		},
		calculateTotalValue: (state, action) => {
			const { price, count } = action.payload;
			state.totalValue += price * count;
			return state;
		},
		incrementItemCount: (state, action) => {
			const { mealId, mealPrice } = action.payload;
			state.cart = state.cart.map((item) =>
				item.id === mealId && item.price === mealPrice
					? { ...item, count: item.count + 1 }
					: item
			);
		},
		decrementItemCount: (state, action) => {
			const { mealId, mealPrice } = action.payload;
			state.cart = state.cart.map((item) =>
				item.id === mealId && item.price === mealPrice && item.count > 1
					? { ...item, count: item.count - 1 }
					: item
			);
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
