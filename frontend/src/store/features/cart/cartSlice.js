import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
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
			state.cart = action.payload;
		},
		removeFromCart(state) {},
	},
});

export const { addToCart, updateCountItem, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
