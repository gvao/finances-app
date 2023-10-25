import { Header, MonthSummary, TableExpenses } from "./components";

import "./styles/App.css";

function App() {
	return (
		<main className={`container`}>
			<Header />

			<MonthSummary />

			<TableExpenses />
		</main>
	);
}


export default App;
