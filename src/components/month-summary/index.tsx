import { useAccountContext } from "../../context/accounts";
import { transformCurrency } from "../../utils";
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
				<ChevronLeft onClick={prevMonth} />
				<h2>{labelMonth}</h2>
				<ChevronRight onClick={nextMonth} />
			</div>

			<div>
				<span className={styles.value}>
					R$ {transformCurrency(totalValue)}
				</span>
			</div>
		</div>
	);
};

const ChevronLeft = ({ ...props }) => (
	<svg
		className={styles.icon}
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path
			fillRule="evenodd"
			d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
			clipRule="evenodd"
		/>
	</svg>
);

const ChevronRight = ({ ...props }) => (
	<svg
		className={styles.icon}
		{...props}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path
			fillRule="evenodd"
			d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
			clipRule="evenodd"
		/>
	</svg>
);
