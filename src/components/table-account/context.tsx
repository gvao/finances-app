import { createContext, useContext } from "react";
import { useAccountContext } from "../../context/accounts";
import { Account } from "../../core/account";
import EventEmitter from "../../utils/emitter";

type TableProps = {
	updateAccountProperty: (account: Account, newAccount: Account) => void;
};

const TableContext = createContext<TableProps>({} as TableProps);
export const useTableContext = () => useContext(TableContext);

export default function TableContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const emitter = new EventEmitter();

	const { updateAccount } = useAccountContext();

	const updateAccountProperty = (account: Account, newAccount: Account) => {
		emitter.emit("updateAccount", { account, newAccount });
	};

	emitter.on("updateAccount", async (props) => {

		const { account, newAccount } = props as {
			account: Account;
			newAccount: Account;
		};

		await updateAccount(account.id!, newAccount);
	});

	return (
		<TableContext.Provider
			value={{
				updateAccountProperty,
			}}
		>
			{children}
		</TableContext.Provider>
	);
}
