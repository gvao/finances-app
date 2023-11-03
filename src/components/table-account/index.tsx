import { Account } from "../../core/account/model";
import { useAccountContext } from "../../context/accounts";
import { transformCurrency, FormatDate } from "../../utils";

import styles from "./styles.module.css";
import { TrashIcon } from "../../utils/icons";
import TableContextProvider, { useTableContext } from "./context";
import { FormEvent, useState } from "react";

export const TableExpenses = () => {
	return (
		<table className={styles.table}>
			<TableContextProvider>
				<thead>
					<tr>
						<th>Dia</th>
						<th>Descrição</th>
						<th>Valor</th>
						<th>actions</th>
					</tr>
				</thead>

				<TableBody />
			</TableContextProvider>
		</table>
	);
};

function TableBody() {
	const { accounts } = useAccountContext();

	return (
		<tbody className={styles.body}>
			{accounts.map((account) => (
				<TableRow key={account.id} account={account} />
			))}
		</tbody>
	);
}

function TableRow({ account, ...props }: { account: Account }) {
	const [total, setTotal] = useState(account.total);

	const { deleteAccount } = useAccountContext();
	const { updateAccountProperty, validateNumber } = useTableContext();

	const { setName, setTotalValue } = updateAccountProperty(account);
	const deleteAccountOnClick = () => deleteAccount(account);

	const onInput = setTotalValue(total);
	const inputNumber = (event: FormEvent<HTMLTableDataCellElement>) => {
		const { textContent } = event.currentTarget;
		
		const number = validateNumber(textContent);
		if (number) setTotal(number);
	};
	
	const day = FormatDate(account.date, { day: "2-digit" });

	return (
		<tr {...props} className={styles.row}>
			<td className={styles.cell}>{day}</td>

			<td
				className={styles.cell}
				contentEditable
				suppressContentEditableWarning
				onBlur={setName}
				id={"name"}
			>
				{account.name}
			</td>

			<td
				className={styles.cell}
				onBlur={onInput}
				onInput={inputNumber}
				contentEditable
				suppressContentEditableWarning
			>
				R$ {transformCurrency(total)}
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
