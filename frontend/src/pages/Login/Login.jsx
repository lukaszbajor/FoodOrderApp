// import axios from "axios";
// import { Button } from "../../components/UI/Button/Button";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../store/features/auth/authSlice";

// import { useDispatch } from "react-redux";
// // import { LoginContext } from "../../Contexts/LoginContext";
// import Swal from "sweetalert2";

// export const Login = () => {
// 	const [userLogin, setUserLogin] = useState("");
// 	const [userPassword, setUserPassword] = useState("");
// 	// const { setIsLoggedIn } = useContext(LoginContext);
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();

// 	axios.defaults.withCredentials = true;

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		axios
// 			.post("http://localhost:5000/login", { userLogin, userPassword })
// 			.then((response) => {
// 				if (response.data) {
// 					console.log(response);
// 					const { user, token } = response.data;
// 					// localStorage.setItem("token", token);
// 					dispatch(login({ user, token }));
// 					navigate("/");
// 					// setIsLoggedIn(true);
// 					Swal.fire({
// 						icon: "success",
// 						title: "Logowanie...",
// 						timer: 2000,
// 						showConfirmButton: false,
// 					});
// 				} else {
// 					console.log("Brak danych");
// 				}
// 				// console.log(response.data.name);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				Swal.fire({
// 					icon: "error",
// 					title: "Błąd logowania",
// 					text: err.response,
// 				});
// 			});
// 	};

// 	return (
// 		<div>
// 			<div>
// 				<h1> Logowanie</h1>
// 				<form onSubmit={handleSubmit}>
// 					<div>
// 						<label htmlFor="login">
// 							<strong>Login:</strong>
// 						</label>
// 						<input
// 							type="text"
// 							placeholder="Wprowadź login"
// 							name="login"
// 							value={userLogin}
// 							onChange={(e) => {
// 								setUserLogin(e.target.value);
// 							}}
// 						/>
// 					</div>
// 					<div>
// 						<label htmlFor="password">
// 							<strong>Hasło:</strong>
// 						</label>
// 						<input
// 							type="password"
// 							placeholder="Wprowadź hasło"
// 							name="password"
// 							value={userPassword}
// 							onChange={(e) => {
// 								setUserPassword(e.target.value);
// 							}}
// 						/>
// 					</div>

// 					<Button type="submit">Zaloguj</Button>
// 					<Button type="button">Wyczyść</Button>
// 				</form>
// 				<p>
// 					Nie masz konta? <Link to="/register">zarejstruj się!</Link>
// 				</p>
// 			</div>
// 		</div>
// 	);
// };

import axios from "axios";
import { Button } from "../../components/UI/Button/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import styles from "./Login.module.scss";

export const Login = () => {
	const [userLogin, setUserLogin] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	axios.defaults.withCredentials = true;

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/login", { userLogin, userPassword })
			.then((response) => {
				if (response) {
					console.log(response);
					navigate("/");
					Swal.fire({
						icon: "success",
						title: "Logowanie powiodło się!",
						timer: 2000,
						showConfirmButton: false,
					});
				} else {
					console.log("Brak danych użytkownika w odpowiedzi");
				}
			})
			.catch((err) => {
				console.error("Błąd logowania:", err);
				Swal.fire({
					icon: "error",
					title: "Błąd logowania",
					text: err.response.data.message || "Wystąpił błąd podczas logowania.",
				});
			});
	};

	return (
		<div className={styles.login}>
			<div className={styles.login__box}>
				<h1 className={styles.login__title}>Logowanie</h1>
				<form className={styles.login__form} onSubmit={handleSubmit}>
					<div>
						<label htmlFor="login">
							<strong>Login:</strong>
						</label>
						<input
							type="text"
							placeholder="Wprowadź login"
							name="login"
							value={userLogin}
							className={styles.login__input}
							onChange={(e) => setUserLogin(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">
							<strong>Hasło:</strong>
						</label>
						<input
							type="password"
							placeholder="Wprowadź hasło"
							name="password"
							value={userPassword}
							className={styles.login__input}
							onChange={(e) => setUserPassword(e.target.value)}
						/>
					</div>
					<div className={styles.login__buttons}>
						<Button type="submit" className={styles.login__button}>
							Zaloguj
						</Button>
						<Button
							type="button"
							className={styles.login__button}
							onClick={() => {
								setUserLogin("");
								setUserPassword("");
							}}
						>
							Wyczyść
						</Button>
					</div>
					<p className={styles.login__text}>
						Nie masz konta? <Link to="/register">Zarejestruj się!</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
