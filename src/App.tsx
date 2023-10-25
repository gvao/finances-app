import { FormAccount, Header, MonthSummary, TableExpenses } from "./components";

import "./styles/App.css";

function App() {
	return (
		<main className={`container`}>
			<Header />

			<MonthSummary />

			<FormAccount />

			<TableExpenses />
		</main>
	);
}


export default App;
