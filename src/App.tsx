import FormAccount from "./components/form-account";
import { TableExpenses } from "./components/table";

import "./styles/App.css";

function App() {
	return (
		<main className={`container`}>
			<header>
				<h1>Finances</h1>
				<h2>Minhas finança em um só lugar!</h2>
			</header>

			<FormAccount />

			<TableExpenses />
		</main>
	);
}

export default App;
