import { useContext } from "react";
import { Account } from "../core/account/model";
import { AccountContext } from "../context/accounts";

export const TableExpenses = () => {
	const { accounts } = useContext(AccountContext);

	if (accounts.length < 0) return null;

	const headers = ["name", "total"];

	return (
		<table>
			<thead>
				<tr>
					{headers.map((key, i) => (
						<th key={`header-${key}-${i}`}>{key}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{accounts
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.map((account) => (
						<TableRow
							key={account.id}
							account={account}
							headers={headers}
						/>
					))}
			</tbody>
		</table>
	);
};

const TableRow = ({
	account,
	headers,
}: {
	account: Account;
	headers: string[];
}) => {

	const { deleteAccount } = useContext(AccountContext);

	const deleteAccountOnClick = () => {
		deleteAccount!(account.id!)
	}

	return (
		<tr>
			{headers.map((key) => (
				<td key={key + "-" + account.id}>{account[key]}</td>
			))}

			<td>
				<button onClick={deleteAccountOnClick}>delete</button>
			</td>
		</tr>
	);
};
