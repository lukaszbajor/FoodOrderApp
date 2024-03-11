import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const { name, price } = action.payload;
			state.cart.push({ name, price });
		},
		removeFromCart(state) {},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
