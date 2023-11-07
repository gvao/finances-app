import { ReactNode } from "react";
import { Account } from "../../core/account";

export type ProviderAccountContextProps = {
	children: ReactNode;
};

export type AccountContextProps = {
	addAccount(newAccount: Partial<Account>): void;
	deleteAccount(account: Account): void;
	nextMonth(): void;
	prevMonth(): void;
	currentDate: Date;
	balance: number;
	accounts: Account[];
	updateAccount: (id: string, AccountWithUpdate: Account) => Promise<void>;
};
