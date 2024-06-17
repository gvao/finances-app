import { useContext } from "react"
import { FinanceContext } from "../context"
import { List } from "../../shared/component/List"
import TransactionItem from "./TransactionItem"

export default function ListTransactions() {
    const { transactions } = useContext(FinanceContext)
    return (
        <List>
            {transactions.map(transaction => (
                <TransactionItem transaction={transaction} key={transaction.id} />
            ))}
        </List>
    )
}

