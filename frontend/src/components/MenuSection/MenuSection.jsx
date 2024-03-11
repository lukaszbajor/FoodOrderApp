// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setMeals } from "../../store/features/meals/mealsSlice";
import Meals from "../Meals/Meals";
import { Button } from "../UI/Button/Button";
import styles from "./MenuSection.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
// import {
// 	faCarSide,
// 	faClock,
// 	faLocationDot,
// 	faPhone,
// } from "@fortawesome/free-solid-svg-icons";

function MenuSection() {
	const dispatch = useDispatch();
	const meals = useSelector((state) => state.meals.meals);

	const [selectedCategory, setSelectedCategory] = useState("pizza");

	useEffect(() => {
		axios
			.get("http://localhost:5000/meals")
			.then((response) => {
				dispatch(setMeals(response.data.meals));
				console.log(meals);
			})
			.catch((error) => {
				console.error("Błąd podczas pobierania produktów:", error);
			});
	}, []);

	const handleCategoryFilter = (category) => {
		setSelectedCategory(category);
	};

	const filteredMeals = selectedCategory
		? meals.filter((meal) => meal.category === selectedCategory)
		: meals;

	return (
		<section className={styles.menu}>
			<div className={styles.menu__wrap}>
				<div>
					<Button onClick={() => handleCategoryFilter("pizza")}>Pizza</Button>
					<Button onClick={() => handleCategoryFilter("burger")}>
						Burgery
					</Button>
					<Button onClick={() => handleCategoryFilter("fries")}>Frytki</Button>
					<Button onClick={() => handleCategoryFilter("drink")}>Napoje</Button>
				</div>
				<div>
					<Meals meals={filteredMeals} />
				</div>
			</div>
		</section>
	);
}

export default MenuSection;
