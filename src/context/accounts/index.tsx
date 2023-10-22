import { createContext, useContext, useEffect, useState } from "react";
import { AccountContextProps, ProviderAccountContextProps } from "./types.ts";
import { Account } from "../../core/account/model.ts";
import localStorageRepository from "../../external/repository/localStorageRepository.ts";
import {
	deleteAccountById,
	getAllAccounts,
	insertAccount,
} from "../../core/account/use-cases/index.ts";

const INITIAL = {
	accounts: [],
};

export const AccountContext = createContext({} as AccountContextProps);
export const useAccountContext = () => useContext(AccountContext);

export default function ProviderAccountContext({
	children,
}: ProviderAccountContextProps) {
	const [accounts, setAccounts] = useState<Account[]>(INITIAL.accounts);

	const repository = localStorageRepository("accounts");

	useEffect(() => {
		(async () => {
			const accounts = await getAllAccounts(await repository);

			setAccounts(accounts);
		})();
	}, []);

	async function addAccount(newAccount: Partial<Account>) {
		const createdAccount = insertAccount(await repository, newAccount);
		setAccounts((state) => ([ ...state, createdAccount ]));
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
