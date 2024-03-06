import { useReducer } from "react";
import { Button } from "../../components/UI/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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
		<div>
			<div>
				<h1> Rejestracja</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">
							<strong>Imię*:</strong>
						</label>
						<input
							type="text"
							placeholder="Wprowadź imię"
							name="name"
							value={state.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="surname">
							<strong>Nazwisko:</strong>
						</label>
						<input
							type="text"
							placeholder="Wprowadź nazwisko"
							name="surname"
							value={state.surname}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label htmlFor="login">
							<strong>Login*:</strong>
						</label>
						<input
							type="text"
							placeholder="Wprowadź login"
							name="login"
							value={state.login}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="email">
							<strong>E-mail*:</strong>
						</label>
						<input
							type="email"
							placeholder="Wprowadź email"
							name="email"
							value={state.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="password">
							<strong>Hasło*:</strong>
						</label>
						<input
							type="password"
							placeholder="Wprowadź hasło"
							name="password"
							value={state.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="repeatPassword">
							<strong>Powtórz hasło*:</strong>
						</label>
						<input
							type="password"
							placeholder="Wprowadź hasło ponownie"
							name="repeatPassword"
							value={state.repeatPassword}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="date">
							<strong>Data urodzenia*:</strong>
						</label>
						<input
							type="date"
							placeholder="Wprowadź datę urodzin"
							name="date"
							value={state.date}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="sex">
							<strong>Wybierz płeć*:</strong>
						</label>
						<input
							type="radio"
							name="sex"
							value="K"
							onChange={handleChange}
							required
						/>
						Kobieta
						<input
							type="radio"
							name="sex"
							value="M"
							onChange={handleChange}
							required
						/>
						Męższczyzna
					</div>
					<Button type="submit">Wyślij</Button>
					<Button type="button" onClick={() => dispatch({ type: "reset" })}>
						Wyczyść
					</Button>
				</form>
				<p>
					Masz konto? <Link to="/login">Zaloguj się!</Link>
				</p>
			</div>
		</div>
	);
};
