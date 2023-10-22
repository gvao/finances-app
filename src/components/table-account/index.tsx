import { Account } from "../../core/account/model";
import { useAccountContext } from "../../context/accounts";
import { transformCurrency, transformDate } from "../../utils";

import styles from "./styles.module.css";
import Button from "../common/button";

export const TableExpenses = () => {
	const { accounts } = useAccountContext();

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>Titulo</th>
					<th>Valor</th>
					<th>Data</th>
					<th>actions</th>
				</tr>
			</thead>
			<tbody className={styles.body}>
				{accounts.map((account) => (
					<TableRow key={account.id} account={account} />
				))}
			</tbody>
		</table>
	);
};

function TableRow({ account, ...props }: { account: Account }) {
	const { deleteAccount } = useAccountContext();

	const { name, total, id, createAt } = account;
	const date = new Date(createAt);

	const deleteAccountOnClick = () => deleteAccount!(id!);

	return (
		<tr key="teste" {...props} className={styles.row}>
			<td className={styles.cell}>{name}</td>
			<td className={styles.cell}>R$ {transformCurrency(total)}</td>
			<td className={styles.cell}>{transformDate(date)}</td>

			<td className={styles.cell}>
				<Button onClick={deleteAccountOnClick}>delete</Button>
			</td>
		</tr>
	);
}
