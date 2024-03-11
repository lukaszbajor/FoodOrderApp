import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth/authSlice";
import cartReducer from "../store/features/cart/cartSlice";
import mealsReducer from "./features/meals/mealsSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		meals: mealsReducer,
	},
});
