import { useAccountContext } from "../../context/accounts";
import { transformCurrency } from "../../utils";
import styles from "./styles.module.css";

export const MonthSummary = () => {
	const { accounts } = useAccountContext()

	const totalValue = accounts.reduce((acc, account) => acc = acc + +account.total, 0)

	return (
		<div className={styles.wrap}>
			<p>Total:</p>
			<span className={styles.value} >R$ {transformCurrency(totalValue)}</span>
		</div>
	);
};
