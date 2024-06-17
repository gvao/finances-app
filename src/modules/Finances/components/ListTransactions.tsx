import { useContext } from "react"
import { FinanceContext } from "../context"
import { List } from "../../shared/component/List"
import { Item } from "../../shared/component/Item"
import { Text } from "../../shared/component/Text"

export default function ListTransactions() {
    const { transactions } = useContext(FinanceContext)
    return (
        <List>
            {transactions.map(transaction => (
                <Item key={transaction.id}>
                    <Text>{transaction.description}</Text>
                </Item>
            ))}
        </List>
    )
}