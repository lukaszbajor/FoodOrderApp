import React, { useEffect, useState } from "react";
import { Button } from "../../components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/features/auth/authSlice";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../components/Header/Header";
import InfoSection from "../../components/InfoSection/InfoSection";

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);

	const dispatch = useDispatch();

	axios.defaults.withCredentials = true;

	function handleLogout() {
		axios
			.get("http://localhost:5000/logout", {
				withCredentials: true, // Przekazanie sesji w żądaniu
			})
			.then(() => {
				setTimeout(() => {
					dispatch(logout());
				}, 2000);

				Swal.fire({
					icon: "success",
					title: "Wylogowywanie...",
					timer: 2000,
					showConfirmButton: false,
				});
				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Błąd wylogowywania:", error);
			});
	}

	useEffect(() => {
		console.log(user);
		setIsLoading(true);
		axios
			.get("http://localhost:5000")
			.then((response) => {
				console.log(response);
				console.log(isAuthenticated, { user });

				dispatch(login({ user: response.data.user, isAuthenticated: true }));

				setIsLoading(false);
			})
			.catch((error) => {
				console.error("Błąd weryfikacji sesji:", error);
				dispatch(logout());
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			{isLoading ? (
				<div>Ładowanie...</div>
			) : isAuthenticated && user ? (
				<div>
					<h2>Witaj, {user.name}!</h2>
					<p>Nazwisko: {user.surname}</p>
					<Button onClick={handleLogout}>Wyloguj</Button>
					{/* Dodaj tutaj inne treści dla zalogowanych użytkowników */}
				</div>
			) : (
				""
			)}
			<Header />
			<InfoSection />
		</>
	);
}
