import React, { useEffect, useState } from "react";
import { Button } from "../../components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../store/features/auth/authSlice";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../components/Header/Header";
import InfoSection from "../../components/InfoSection/InfoSection";
import MenuSection from "../../components/MenuSection/MenuSection";

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);

	const dispatch = useDispatch();

	axios.defaults.withCredentials = true;

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
			<Header />
			<InfoSection />
			<MenuSection />
		</>
	);
}
