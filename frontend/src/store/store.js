import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth/authSlice";
import cartReducer from "../store/features/cart/cartSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
	},
});
