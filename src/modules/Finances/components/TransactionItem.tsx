import { Item } from "../../shared/component/Item"
import { Text } from "../../shared/component/Text"
import Transaction from "../domain/transaction"
import styles from "./styles.module.css"

const TransactionItem = ({ transaction, ...props }: TransactionItemProps) => (
    <Item {...props} className={styles.transactionItem} >
        <div className="area">
            <Text>{transaction.description}</Text>
            <Text>{transaction.description}</Text>
        </div>
        <div className="area">
            <Text>{transaction.description}</Text>
            <Text>{transaction.description}</Text>
        </div>
    </Item>
)

type TransactionItemProps = { transaction: Transaction }

export default TransactionItem