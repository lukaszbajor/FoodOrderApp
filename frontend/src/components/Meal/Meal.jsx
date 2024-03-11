// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../UI/Button/Button";
import styles from "./Meal.module.scss";
// import {
// 	faCarSide,
// 	faClock,
// 	faLocationDot,
// 	faPhone,
// } from "@fortawesome/free-solid-svg-icons";

function Meal({ meal }) {
	return (
		<li>
			<p>{meal.name}</p>
			<img src="" alt="" />
			<p>{meal.ingradients}</p>
			<p>{meal.describe}</p>
			<div>
				<p>
					mała porcja <button>19,99</button>
				</p>
				<p>
					średnia porcja <button>29,99</button>
				</p>
				<p>
					duża porcja <button>39,99</button>
				</p>
			</div>
		</li>
	);
}

export default Meal;
