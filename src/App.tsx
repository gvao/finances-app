import { FormAccount, MonthSummary, TableExpenses } from "./components";

import "./styles/App.css";

function App() {
	return (
		<main className={`container`}>
			<header>
				<h1>Finances</h1>
				<h2>Minhas finança em um só lugar!</h2>
			</header>

			<MonthSummary />

			<FormAccount />

			<TableExpenses />
		</main>
	);
}


export default App;
