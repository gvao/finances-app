import { Account } from "../../core/account/model";
import { useAccountContext } from "../../context/accounts";
import { transformCurrency, FormatDate } from "../../utils";

import styles from "./styles.module.css";
import { TrashIcon } from "../../utils/icons";
import { FocusEvent, FormEvent, useState } from "react";

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
	const [data, setData] = useState(account);
	const [total, setTotal] = useState(data.total);

	const { deleteAccount, updateAccount } = useAccountContext();

	const dateDay = FormatDate(data.date, { day: "2-digit" });

	const deleteAccountOnClick = () => deleteAccount!(data.id!);

	const updateAccountName = async (
		event: FocusEvent<HTMLTableDataCellElement, Element>
	) => {
		const { textContent } = event.currentTarget as Element;

		const newValue = { ...account, name: textContent || "" };

		await updateAccount(data.id!, newValue);
		setData(newValue);
	};

	const updateAccountTotal = async (
		event: FocusEvent<HTMLTableDataCellElement, Element>
	) => {
		const target = event.currentTarget;
		target.textContent = `R$ ${transformCurrency(data.total)}`;
		
		const newValue = { ...data, total };
		setData(newValue);

		await updateAccount(data.id!, newValue);
	};

	const convertPriceInNumber = (textContent: string | null) =>
		Number(textContent?.replace("R$ ", "").replace(",", ".").trim());

	const validateNumber = (event: FormEvent<HTMLTableDataCellElement>) => {
		const numberSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		const { textContent } = event.currentTarget;
		const filterNumbers = (character: string) =>
			character === "," || numberSet.includes(Number(character));

		const number = textContent!
			.split("")
			.filter(filterNumbers)
			.join("")
			.trim();
		const price = convertPriceInNumber(number);
		setTotal(price);
	};

	return (
		<tr {...props} className={styles.row}>
			<td className={styles.cell}>{dateDay}</td>

			<td
				className={styles.cell}
				contentEditable
				suppressContentEditableWarning
				onBlur={updateAccountName}
				id={"name"}
			>
				{data.name}
			</td>

			<td
				className={styles.cell}
				onBlur={updateAccountTotal}
				onInput={validateNumber}
				contentEditable
				suppressContentEditableWarning
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
