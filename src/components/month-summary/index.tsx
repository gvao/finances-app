import { useAccountContext } from "../../context/accounts";
import { FormatDate, transformCurrency } from "../../utils";
import { ChevronLeft, ChevronRight } from "../../utils/icons";
import styles from "./styles.module.css";

export const MonthSummary = () => {
	const { nextMonth, prevMonth, balance, currentDate } = useAccountContext();

	const month = FormatDate(currentDate, { month: 'long' });
	const year = currentDate.getFullYear();

	return (
		<div className={styles.wrap}>
				<span className={styles.value}>
					R$ {transformCurrency(balance)}
				</span>
			<div className={styles.actions}>
				<ChevronLeft className={styles.icon} onClick={prevMonth} />
				<h2 style={{
					whiteSpace: "nowrap",
				}} >
					{month} / {year}
				</h2>
				<ChevronRight className={styles.icon} onClick={nextMonth} />
			</div>

			<div></div>
		</div>
	);
};
