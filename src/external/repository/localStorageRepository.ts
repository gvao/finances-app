import { Repository } from "../../core/shared/repository";
import { Account } from "../../core/account/model";

const makeObserver = () => {
	const listeners: (() => void)[] = [];

	return {
		emit: () => listeners.forEach((listener) => listener()),

		subscribe: (listener: () => void) => listeners.push(listener),
	};
};

export default async function localStorageRepository(
	repositoryName: string
): Promise<Repository<Account>> {
	const observer = makeObserver();

	const accounts: Account[] = (await getAll()) || [];

	const save = () => {
		localStorage.setItem(repositoryName, JSON.stringify(accounts));
    console.log('save accounts')
	};

	const sortAccounts = () => {
		accounts.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)

    console.log('sorting accounts')
	};

	observer.subscribe(sortAccounts);
	observer.subscribe(save);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async function add(data: any) {
		accounts.push(data);
		observer.emit();
	}

	async function getAll() {
		try {
			const data = localStorage.getItem(repositoryName);

			if (!data) {
				throw new Error(
					`Not found ${repositoryName} in local database`
				);
			}

			return await JSON.parse(data);
		} catch (err) {
			return [];
		}
	}

	async function deleteById(id: string) {
		const index = accounts.findIndex((account) => account.id === id);
		accounts.splice(index, 1);
		observer.emit();
	}

	async function getLastItem() {
		return await accounts[accounts.length - 1];
	}

	return {
		getLastItem,
		add,
		getAll,
		deleteById,
	};
}
