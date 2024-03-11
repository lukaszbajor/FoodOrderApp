import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	meals: [],
	// category: null,
};

const mealsSlice = createSlice({
	name: "meals",
	initialState,
	reducers: {
		setMeals(state, action) {
			state.meals = action.payload;
		},
		// setCategory(state, action) {
		// 	state.category = action.payload;
		// },
	},
});

export const {
	setMeals,
	// setCategory
} = mealsSlice.actions;
export default mealsSlice.reducer;
