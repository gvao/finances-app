import { createContext, useEffect, useState } from "react";
import { AccountContextProps, ProviderAccountContextProps } from "./types.ts";
import { Account } from "../../core/account/model.ts";
import localStorageRepository from "../../external/repository/localStorageRepository.ts";
import {
	deleteAccountById,
	getAllAccounts,
	saveAccount,
} from "../../core/account/use-cases/index.ts";


const INITIAL: AccountContextProps = {
	accounts: [],
};

export const AccountContext = createContext(INITIAL);

export default function ProviderAccountContext({
	children,
}: ProviderAccountContextProps) {
	const [accounts, setAccounts] = useState<Account[]>([]);

	const repository = localStorageRepository("contas");

	useEffect(() => {
		(async () => {
			const accounts = await getAllAccounts(await repository);

			setAccounts(accounts);
		})();
	}, []);

	async function addAccount(newAccount: Account) {
        saveAccount(await repository, { name: "teste", total: 100 });
		setAccounts((state) => ({ ...state, newAccount }));
	}

	async function deleteAccount(id: string) {

		deleteAccountById(await repository, id);
		setAccounts((state) => state.filter((account) => account.id !== id));
	}

	return (
		<AccountContext.Provider
			value={{
				accounts,
				addAccount,
				deleteAccount,
			}}
		>
			{children}
		</AccountContext.Provider>
	);
}
