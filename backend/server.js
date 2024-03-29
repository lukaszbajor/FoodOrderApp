import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";

const salt = 10;

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: ["http://localhost:5173", "http://localhost:5000"],
		methods: ["POST", "GET", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: "qazcdetgbmjuyhnvfrwsx",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false, // Jeśli używasz HTTPS, zmień na true
			sameSite: "lax",
			maxAge: 24 * 60 * 60 * 1000, // Czas wygaśnięcia sesji w milisekundach (tu: 1 dzień)
		},
	})
);

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "foodorder",
});

const returnMsg = (res, msg, code = 200, data = {}) => {
	res.status(code);
	res.send({ message: msg, ...data });
	return res.end();
};

app.post("/register", (req, res) => {
	const { name, surname, login, email, password, repeatPassword, date, sex } =
		req.body;

	if (password !== repeatPassword) {
		return returnMsg(res, "Hasła różnią się!", 400);
	}

	const sql =
		"INSERT INTO users (`name`,`surname`,`login`,`email`,`password`,`date_birth`,`sex`) VALUES (?)";
	bcrypt.hash(password.toString(), salt, (err, hash) => {
		if (err) return returnMsg(res, "Błąd z szyfrowaniem hasła!", 400);

		const values = [name, surname, login, email, hash, date, sex];
		db.query(sql, [values], (err, result) => {
			if (err) return returnMsg(res, "Błąd serwera podczas rejestracji!", 400);
			return returnMsg(res, "Rejestracja zakończona sukcesem!");
		});
	});
});

app.post("/login", (req, res) => {
	const { userLogin, userPassword } = req.body;

	const sql = "SELECT * FROM users WHERE login = ?";
	db.query(sql, [userLogin], (err, result) => {
		if (err) return returnMsg(res, "Błąd serwera podczas logowania!", 400);

		if (result.length > 0) {
			const user = result[0];
			bcrypt.compare(userPassword.toString(), user.password, (err, isMatch) => {
				if (err) return returnMsg(res, "Błąd serwera podczas logowania!", 400);

				if (isMatch) {
					// Ustaw dane sesji
					req.session.userId = user.id;
					req.session.user = user;
					return returnMsg(res, "Zalogowano pomyślnie!", 200, { user });
				} else {
					return returnMsg(res, "Nieprawidłowe hasło!", 400);
				}
			});
		} else {
			return returnMsg(res, "Nieprawidłowy login!", 400);
		}
	});
});

// Wylogowanie użytkownika
app.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.error("Błąd podczas wylogowania:", err);
			return returnMsg(res, "Błąd podczas wylogowania!", 400);
		} else {
			return returnMsg(res, "Wylogowano pomyślnie!");
		}
	});
});

// Główna ścieżka, która będzie sprawdzać czy użytkownik jest zalogowany
app.get("/", (req, res) => {
	if (req.session.userId) {
		// Użytkownik jest zalogowany, wykonaj odpowiednie działania
		return returnMsg(res, "Witaj na stronie głównej!", 200, {
			user: req.session.user,
		});
	} else {
		// Użytkownik nie jest zalogowany, wykonaj odpowiednie działania
		return returnMsg(res, "Najpierw się zaloguj!", 401);
	}
});

//MEALS

app.get("/meals", (req, res) => {
	const sql =
		"SELECT meals.id, meals.name, meals.category, meals.ingredients, meals.description,  GROUP_CONCAT(meals_details.size) AS sizes, GROUP_CONCAT(meals_details.price) AS prices FROM meals INNER JOIN meals_details ON meals.id = meals_details.id_meal GROUP BY meals.id";
	db.query(sql, (err, results) => {
		if (err) {
			console.error("Błąd podczas pobierania produktów:", err);
			return returnMsg(res, "Błąd serwera podczas pobierania produktów!", 500);
		}
		return returnMsg(res, "Pobrano produkty pomyślnie!", 200, {
			meals: results,
		});
	});
});

app.post("/cart/add", (req, res) => {
	const { count, userId, mealId, mealSize, mealPrice } = req.body;

	const sql =
		"INSERT INTO cart (count, user_id, meal_id, size, price) VALUES (?, ?, ?, ?, ?)";
	db.query(sql, [count, userId, mealId, mealSize, mealPrice], (err, result) => {
		if (err) {
			console.error("Błąd podczas dodawania przedmiotu do koszyka:", err);
			return returnMsg(
				res,
				"Błąd serwera podczas dodawania przedmiotu do koszyka!",
				500
			);
		}
		return returnMsg(
			res,
			"Przedmiot został dodany do koszyka pomyślnie!",
			200,
			{ result }
		);
	});
});

app.post("/cart/update", (req, res) => {
	const { userId, mealId, mealSize } = req.body;

	const sql = `
        UPDATE cart
        SET count = count + 1
		WHERE user_id = ? AND meal_id = ? AND size = ?

    `;

	db.query(sql, [userId, mealId, mealSize], (err, result) => {
		if (err) {
			console.error("Błąd podczas aktualizacji koszyka:", err);
			return returnMsg(res, "Błąd serwera podczas aktualizacji koszyka!", 500);
		}

		return returnMsg(res, "Pomyślnie zaktualizowano koszyk!", 200);
	});
});

app.get("/usercart", (req, res) => {
	const userId = req.session.userId; // Załóżmy, że ID użytkownika jest przechowywane w sesji
	const sql = `
        SELECT cart.*, meals.name
        FROM cart
        INNER JOIN meals ON cart.meal_id = meals.id
        WHERE cart.user_id = ?
    `;
	db.query(sql, [userId], (err, results) => {
		if (err) {
			console.error(
				"Błąd podczas pobierania produktów dla koszyka usera:",
				err
			);
			return returnMsg(res, "Błąd serwera podczas pobierania produktów!", 500);
		}
		return returnMsg(res, "Pobrano produkty pomyślnie!", 200, {
			cartItems: results,
		});
	});
});

app.listen(5000, () => {
	console.log("Serwer działa!");
});
