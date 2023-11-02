import { createContext, useContext, useEffect, useState } from "react";

import { AccountContextProps, ProviderAccountContextProps } from "./types.ts";
import { Account } from "../../core/account/model.ts";
import localStorageRepository from "../../external/repository/localStorageRepository.ts";
import {
	deleteAccountById,
	getAllAccounts,
	insertAccount,
} from "../../core/account/use-cases/index.ts";

import { updateAccountById } from "../../core/account/use-cases";

import styles from "./styles.module.css";
import { FormAccount, Popup } from "../../components";
import { FormatDate } from "../../utils/date.ts";

const INITIAL = {
	accounts: [],
};

export const AccountContext = createContext({} as AccountContextProps);
export const useAccountContext = () => useContext(AccountContext);

const useAccountContextProvider = () => {
	const repository = localStorageRepository("accounts");
	const indexMonth = new Date().getMonth();

	const [currentMonth, setCurrentMonth] = useState<number>(indexMonth);
	const [accounts, setAccounts] = useState<Account[]>(INITIAL.accounts);

	const currentDate = new Date();
	currentDate.setMonth(currentMonth);

	useEffect(() => {
		(async () => {
			const allAccounts = await getAllAccounts(await repository);

			setAccounts(allAccounts);
		})();
	}, []);

	async function addAccount(newAccount: Partial<Account>) {
		const createdAccount = await insertAccount(
			await repository,
			newAccount
		);
		setAccounts((state) => [...state, createdAccount]);
	}

	async function deleteAccount(id: string) {
		deleteAccountById(await repository, id);
		setAccounts((state) => state.filter((account) => account.id !== id));
	}

	async function updateAccount(id: string, AccountWithUpdate: Account) {
		const newAccount = await updateAccountById(
			await repository,
			id,
			AccountWithUpdate
		);
		const accountList = accounts;
		const index = accountList.findIndex(
			(account) => account.id === newAccount.id
		);
		const accountUpdated = accountList[index];

		accountList.splice(index, 1, accountUpdated);
		setAccounts(accountList);
	}

	const getAccountByMonth = (date: Date) =>
		accounts.filter((account) => {
			const isMonthMatch =
				date.getMonth() + 1 ===
				Number(FormatDate(account.date, { month: "2-digit" }));

			const isYearMatch =
				date.getFullYear() ===
				Number(FormatDate(account.date, { year: "numeric" }));

			return isMonthMatch && isYearMatch;
		});

	const nextMonth = () => setCurrentMonth((month) => month + 1);

	const prevMonth = () => setCurrentMonth((month) => month - 1);

	const balance = accounts
		.filter((account) => new Date(account.date).getMonth() <= currentMonth)
		.reduce((acc, account) => acc + +account.total, 0);

	accounts.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	return {
		addAccount,
		deleteAccount,
		updateAccount,
		currentDate,
		balance,
		accounts: getAccountByMonth(currentDate),
		nextMonth,
		prevMonth,
	};
};

export default function ProviderAccountContext({
	children,
}: ProviderAccountContextProps) {
	const {
		accounts,
		addAccount,
		deleteAccount,
		nextMonth,
		prevMonth,
		currentDate,
		balance,
		updateAccount,
	} = useAccountContextProvider();

	const [showForm, setShowForm] = useState<boolean>(false);

	const changeShowForm = () => setShowForm((state) => !state);

	return (
		<AccountContext.Provider
			value={{
				accounts,
				addAccount,
				deleteAccount,
				nextMonth,
				prevMonth,
				updateAccount,
				currentDate,
				balance,

				changeShowForm,
			}}
		>
			{children}

			<AddButton />

			{showForm && (
				<Popup>
					<FormAccount />
				</Popup>
			)}
		</AccountContext.Provider>
	);
}

const AddButton = () => {
	const { changeShowForm } = useAccountContext();

	return (
		<svg
			onClick={changeShowForm}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className={styles.addButton}
		>
			<path
				fillRule="evenodd"
				d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
				clipRule="evenodd"
			/>
		</svg>
	);
};
