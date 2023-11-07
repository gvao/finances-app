import { Account } from "../../core/account/model";
import { useAccountContext } from "../../context/accounts";
import { transformCurrency, FormatDate } from "../../utils";

import styles from "./styles.module.css";
import { TrashIcon } from "../../utils/icons";
import TableContextProvider, { useTableContext } from "./context";
import { FormEvent, useState, useEffect } from "react";
import { validateNumber } from "../../utils/number";
import { Popup } from "..";
import Button from "../common/button";

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
	const [data, setData] = useState(account);

	const { deleteAccount } = useAccountContext();
	const { updateAccountProperty } = useTableContext();

	const deleteAccountOnClick = () => deleteAccount(account);

	const onBlur = (event: FormEvent<HTMLTableDataCellElement>) => {
		const { currentTarget: target } = event;

		if (target.id === "total") {
			const result = validateNumber(target.textContent);

			setData((state) => ({ ...state, [target.id]: result }));

			const currencyValue = transformCurrency(result!);
			event.currentTarget.textContent = `R$ ${currencyValue}`;
		} else {
			setData((state) => ({ ...state, [target.id]: target.textContent }));
		}
	};

	useEffect(() => {
		updateAccountProperty(account, data);
	}, [data]);

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
				<ButtonDelete onConfirm={deleteAccountOnClick} />
			</td>
		</tr>
	);
}

const ButtonDelete = ({ onConfirm, ...props }: { onConfirm(): void }) => {
	const [showPopup, setShowPopup] = useState(false);

	function onConfirmClick() {
		onConfirm();
	}

	function onCancelClick() {
		setShowPopup(false);
	}

	return (
		<>
			<TrashIcon
				className={styles.trashIcon}
				onClick={() => setShowPopup(!showPopup)}
				{...props}
			/>
			{showPopup && (
				<Popup>
					<p>Deseja excluir o item?</p>
					<div className="actions">
						<Button onClick={onConfirmClick}>Confirmar</Button>
						<Button onClick={onCancelClick}>Cancelar</Button>
					</div>
				</Popup>
			)}
		</>
	);
};
