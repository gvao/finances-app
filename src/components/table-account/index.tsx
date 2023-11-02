import { Account } from "../../core/account/model";
import { useAccountContext } from "../../context/accounts";
import { transformCurrency, FormatDate } from "../../utils";

import styles from "./styles.module.css";
import { TrashIcon } from "../../utils/icons";
import { FocusEvent } from "react";

export const TableExpenses = () => {
	const { accounts } = useAccountContext();

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
				{accounts.map((account) => (
					<TableRow key={account.id} account={account} />
				))}
			</tbody>
		</table>
	);
};

function TableRow({ account, ...props }: { account: Account }) {
	const { deleteAccount, updateAccount } = useAccountContext();

	const deleteAccountOnClick = () => deleteAccount!(account.id!);

	const dateFormatted = FormatDate(account.date, { day: "2-digit" });

	const updateAccountName = async (
		event: FocusEvent<HTMLTableDataCellElement, Element>
	) => {
		const { textContent } = event.currentTarget as Element;
		
		const newValue = { ...account, name: textContent || "" }
		
		await updateAccount(account.id!, newValue)
	};

	return (
		<tr {...props} className={styles.row}>
			<td className={styles.cell}>{dateFormatted}</td>
			<td
				className={styles.cell}
				contentEditable
				suppressContentEditableWarning
				onBlur={updateAccountName}
				id={'name'}
			>
				{account.name}
			</td>
			<td className={styles.cell}>
				R$ {transformCurrency(account.total)}
			</td>
			<td className={styles.cell}>
				<TrashIcon
					className={styles.trashIcon}
					onClick={deleteAccountOnClick}
				/>
			</td>
		</tr>
	);
}
