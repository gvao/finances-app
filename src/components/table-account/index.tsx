import { Account } from "../../core/account/model";
import { useAccountContext } from "../../context/accounts";
import { transformCurrency, FormatDate } from "../../utils";

import styles from "./styles.module.css";
import { TrashIcon } from "../../utils/icons";

export const TableExpenses = () => {
	const { accountsOfMonth } = useAccountContext();

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Dia</th>
					<th>Descrição</th>
					<th>Valor</th>
					<th>actions</th>
				</tr>
			</thead>
			<tbody className={styles.body}>
				{accountsOfMonth.map((account) => (
					<TableRow key={account.id} account={account} />
				))}
			</tbody>
		</table>
	);
};

function TableRow({ account, ...props }: { account: Account }) {
	const { deleteAccount } = useAccountContext();
	const { name, total, id, date } = account;

	const deleteAccountOnClick = () => deleteAccount!(id!);

	const dateFormatted = FormatDate(date, { day: "2-digit" });

	return (
		<tr {...props} className={styles.row}>
			<td className={styles.cell} >{dateFormatted}</td>
			<td className={styles.cell} >{name}</td>
			<td className={styles.cell} >R$ {transformCurrency(total)}</td>
			<td className={styles.cell} >
				<TrashIcon className={styles.trashIcon} onClick={deleteAccountOnClick} />
			</td>
		</tr>
	);
}

