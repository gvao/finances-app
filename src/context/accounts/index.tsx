import { createContext, useContext, useEffect, useState } from "react";

import { AccountContextProps, ProviderAccountContextProps } from "./types.ts";
import { Account } from "../../core/account/model.ts";
import localStorageRepository from "../../external/repository/localStorageRepository.ts";
import {
	deleteAccountById,
	getAllAccounts,
	insertAccount,
} from "../../core/account/use-cases/index.ts";

import styles from "./styles.module.css";
import { FormAccount, Popup } from "../../components";
import { FormatDate } from "../../utils/date.ts";

const INITIAL = {
	accounts: [],
};

export const AccountContext = createContext({} as AccountContextProps);
export const useAccountContext = () => useContext(AccountContext);

export default function ProviderAccountContext({
	children,
}: ProviderAccountContextProps) {
	const repository = localStorageRepository("accounts");
	const indexMonth = new Date().getMonth();

	const [currentMonth, setCurrentMonth] = useState<number>(indexMonth);
	const [accounts, setAccounts] = useState<Account[]>(INITIAL.accounts);
	const [showForm, setShowForm] = useState<boolean>(false);

	const currentDate = new Date();
	currentDate.setMonth(currentMonth);

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

	const balance = accounts
	.filter(account => new Date(account.date).getMonth() <= currentMonth)
	.reduce((acc, account) => acc + +account.total, 0)

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

	const nextMonth = () => setCurrentMonth((month) => month + 1);

	const prevMonth = () => setCurrentMonth((month) => month - 1);

	const changeShowForm = () => setShowForm((state) => !state);

	return (
		<AccountContext.Provider
			value={{
				accounts: getAccountByMonth(currentDate),
				addAccount,
				deleteAccount,
				nextMonth,
				prevMonth,
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
