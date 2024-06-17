import FormTransaction from "./components/FormTransaction";
import ListTransactions from "./components/ListTransactions";
import FinanceContextProvider from "./context";

export default function FinancesPage() {
    return (
        <FinanceContextProvider>
            <FormTransaction />
            <ListTransactions />
        </FinanceContextProvider>
    )
}