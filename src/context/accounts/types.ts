import { ReactNode } from "react"
import { Account } from "../../core/account";

export type ProviderAccountContextProps = {
    children: ReactNode,
}

export type AccountContextProps = {
	accounts: Account[];
	addAccount: (newAccount: Partial<Account>) => void;
	deleteAccount: (id: string) => void;
	changeShowForm: () => void;
};
