import { useReducer } from "react";
import { Button } from "../../components/UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./Register.module.scss";

const initialState = {
	name: "",
	surname: "",
	login: "",
	email: "",
	password: "",
	repeatPassword: "",
	date: "",
	sex: "",
};

function reducer(state, action) {
	switch (action.type) {
		case "change":
			return { ...state, [action.field]: action.value };
		case "reset":
			return initialState;
		default:
			return state;
	}
}

export const Register = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();
	// axios.defaults.withCredentials = true;
	const handleChange = (e) => {
		dispatch({ type: "change", field: e.target.name, value: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Dane:", state);
		axios
			.post("http://localhost:5000/register", state)
			.then((response) => {
				Swal.fire({
					icon: "success",
					title: "Strona logowania...",
					text: response.data.message,
				});
				dispatch({
					type: "reset",
				});
				// navigate("/login");
			})
			.catch((err) => {
				console.log(err);
				Swal.fire({
					icon: "error",
					title: "Błąd rejestracji",
					text: err.response.data,
				});
			});
	};

	return (
		<div className={styles.register}>
			<div className={styles.register__box}>
				<h1 className={styles.register__title}> Rejestracja</h1>
				<form className={styles.register__form} onSubmit={handleSubmit}>
					<div className={styles.register__inputBox}>
						<label htmlFor="name">Imię*:</label>
						<input
							type="text"
							placeholder="Wprowadź imię"
							name="name"
							value={state.name}
							className={styles.register__input}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.register__inputBox}>
						<label htmlFor="surname">Nazwisko:</label>
						<input
							type="text"
							placeholder="Wprowadź nazwisko"
							name="surname"
							value={state.surname}
							className={styles.register__input}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.register__inputBox}>
						<label htmlFor="login">Login*:</label>
						<input
							type="text"
							placeholder="Wprowadź login"
							name="login"
							value={state.login}
							className={styles.register__input}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.register__inputBox}>
						<label htmlFor="email">E-mail*:</label>
						<input
							type="email"
							placeholder="Wprowadź email"
							name="email"
							value={state.email}
							className={styles.register__input}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.register__inputBox}>
						<label htmlFor="password">Hasło*:</label>
						<input
							type="password"
							placeholder="Wprowadź hasło"
							name="password"
							value={state.password}
							className={styles.register__input}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.register__inputBox}>
						<label htmlFor="repeatPassword">Powtórz hasło*:</label>
						<input
							type="password"
							placeholder="Wprowadź hasło ponownie"
							name="repeatPassword"
							value={state.repeatPassword}
							className={styles.register__input}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.register__inputBox}>
						<label htmlFor="date">Data urodzenia*:</label>
						<input
							type="date"
							placeholder="Wprowadź datę urodzin"
							name="date"
							value={state.date}
							className={styles.register__input}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.register__inputRadioBox}>
						<label htmlFor="sex">Płeć*:</label>
						<input
							type="radio"
							name="sex"
							value="K"
							className={styles.register__input}
							onChange={handleChange}
							required
						/>
						<span>Kobieta</span>
						<input
							type="radio"
							name="sex"
							value="M"
							className={styles.register__input}
							onChange={handleChange}
							required
						/>
						<span>Mężczyzna</span>
					</div>
					<div className={styles.register__buttons}>
						<Button className={styles.register__button} type="submit">
							Zarejestruj
						</Button>
						<Button
							type="button"
							className={styles.register__button}
							onClick={() => dispatch({ type: "reset" })}
						>
							Wyczyść
						</Button>
					</div>
					<p className={styles.register__text}>
						Masz konto? <Link to="/login">Zaloguj się!</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
