import { useAccountContext } from "../../context/accounts";
import { transformCurrency } from "../../utils";
import { ChevronLeft, ChevronRight } from "../../utils/icons";
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
				<ChevronLeft className={styles.icon} onClick={prevMonth} />
				<h2>{labelMonth}</h2>
				<ChevronRight className={styles.icon} onClick={nextMonth} />
			</div>

			<div>
				<span className={styles.value}>
					R$ {transformCurrency(totalValue)}
				</span>
			</div>
		</div>
	);
};
