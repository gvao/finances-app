import { useAccountContext } from "../../context/accounts";
import { FormatDate, transformCurrency } from "../../utils";
import { ChevronLeft, ChevronRight } from "../../utils/icons";
import styles from "./styles.module.css";

export const MonthSummary = () => {
	const { nextMonth, prevMonth, balance, currentDate } =
		useAccountContext();

	const totalValue = balance

	const labelMonth = FormatDate(currentDate, {
		month: "long",
		year: "numeric",
	});

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
