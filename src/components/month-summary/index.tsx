import { useAccountContext } from "../../context/accounts";
import { transformCurrency } from "../../utils";
import Button from "../common/button";
import styles from "./styles.module.css";

export const MonthSummary = () => {
	const { accountsOfMonth, nextMonth, prevMonth, getCurrentDate } =
		useAccountContext();

	const totalValue = accountsOfMonth.reduce(
		(acc, account) => (acc = acc + +account.total),
		0
	);

	const labelMonth = getCurrentDate({ month: "long", year: "numeric" });

	return (
		<div className={styles.wrap}>
			<div className={styles.actions}>
				<Button onClick={prevMonth}>prev</Button>
				<h2>{labelMonth}</h2>
				<Button onClick={nextMonth}>next</Button>
			</div>

			<div>
				<span className={styles.value}>
					R$ {transformCurrency(totalValue)}
				</span>
			</div>
		</div>
	);
};
