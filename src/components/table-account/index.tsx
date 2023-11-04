import { Account } from "../../core/account/model";
import { useAccountContext } from "../../context/accounts";
import { transformCurrency, FormatDate } from "../../utils";

import styles from "./styles.module.css";
import { TrashIcon } from "../../utils/icons";
import TableContextProvider, { useTableContext } from "./context";
import { FormEvent, useState } from "react";
import { validateNumber } from "../../utils/number";
import EventEmitter from "../../utils/emitter";

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
	const emitter = new EventEmitter()
	const [data, setData] = useState(account);

	const { deleteAccount } = useAccountContext();
	const { updateAccountProperty } = useTableContext();

	const deleteAccountOnClick = () => deleteAccount(account);

	const onBlur = (event: FormEvent<HTMLTableDataCellElement>) => {
		const { textContent, id } = event.currentTarget;

		if (id === "total") {
			const result = validateNumber(textContent);
			console.log(result)
			if (result) setData({ ...data, [id]: result });
			const currencyValue = transformCurrency(result!)
			event.currentTarget.textContent = `R$ ${currencyValue}`;
		} else {
			setData({ ...data, [id]: textContent });
		}
		emitter.emit('update')
	};


	emitter.on(`update`, () => {
		console.log(`event update`, data)
		updateAccountProperty(account, data);
	})

	const day = FormatDate(data.date, { day: "2-digit" });

	return (
		<tr {...props} className={styles.row}>
			<td className={styles.cell}>{day}</td>

			<td
				className={styles.cell}
				contentEditable
				suppressContentEditableWarning
				onBlur={onBlur}
				id="name"
			>
				{data.name}
			</td>

			<td
				className={styles.cell}
				onBlur={onBlur}
				// onInput={onInput}
				contentEditable
				suppressContentEditableWarning
				id="total"
			>
				R$ {transformCurrency(data.total)}
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
