import styles from "./UserAccountMenu.module.scss";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { Button } from "../../components/UI/Button/Button";

import { logout } from "../../store/features/auth/authSlice";
import axios from "axios";
import Swal from "sweetalert2";

function UserAccountMenu({ handleShowUser }) {
	const [isLoading, setIsLoading] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

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
				handleShowUser();
			})
			.catch((error) => {
				console.error("Błąd wylogowywania:", error);
			});
	}
	return (
		<div className={styles.userMenu}>
			{isLoading ? (
				<div>Ładowanie...</div>
			) : isAuthenticated && user ? (
				<div className={styles.userMenu__box}>
					<h2 className={styles.userMenu__title}>Witaj, {user.name}!</h2>
					<ul className={styles.userMenu__list}>
						<li className={styles.userMenu__item}>Moje zamówienia</li>
						<li className={styles.userMenu__item}>Moje ulubione</li>
						<li className={styles.userMenu__item}>Ustawienia</li>
					</ul>
					<Button className={styles.userMenu__btn} onClick={handleLogout}>
						Wyloguj
					</Button>

					{/* Dodaj tutaj inne treści dla zalogowanych użytkowników */}
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default UserAccountMenu;
