import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import ProviderAccountContext from "./context/accounts/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ProviderAccountContext>
			<App />
		</ProviderAccountContext>
	</React.StrictMode>
);
