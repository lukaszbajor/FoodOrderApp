import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action) {},
		removeFromCart(state) {},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
