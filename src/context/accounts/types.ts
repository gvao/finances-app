import { ReactNode } from "react";
import { Account } from "../../core/account";

export type ProviderAccountContextProps = {
	children: ReactNode;
};

export type AccountContextProps = {
	addAccount: (newAccount: Partial<Account>) => void;
	deleteAccount: (id: string) => void;
	changeShowForm: () => void;
	accountsOfMonth: Account[];
	nextMonth: () => void;
	prevMonth: () => void;
	getCurrentDate(options: Intl.DateTimeFormatOptions): string | null;
};
