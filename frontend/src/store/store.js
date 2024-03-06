import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth/authSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
	},
});
