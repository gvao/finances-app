import { Account } from "../../core/account";
import styles from "./styles.module.css"
import { transformCurrency, FormatDate } from "../../utils";

export const ListExpenses = ({ accounts }: { accounts: Account[] }) => (
	<ul className={styles.Expenses}>
		{accounts.map((account, i) => (
			<li key={i} className={styles.item}>
				<p>{account.name}</p>
				<p>
					R${" "}
					{transformCurrency(account.total, {
						compactDisplay: "long",
					})}
				</p>
				<p>{FormatDate(account.createAt as Date)}</p>
			</li>
		))}
	</ul>
);
