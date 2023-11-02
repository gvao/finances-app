import { Repository } from "../../core/shared/repository";
import { Account } from "../../core/account/model";
import { makeObserver } from "../../utils/observer";

export default async function localStorageRepository(
	repositoryName: string
): Promise<Repository<Account>> {
	const observer = makeObserver();

	const accounts: Account[] = (await getAll()) || [];

	const save = () => {
		localStorage.setItem(repositoryName, JSON.stringify(accounts));
	};

	const sortAccounts = () => {
		accounts.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);
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

	async function updatedById(id: string, AccountWithUpdate: Account): Promise<Account> {
		const index = accounts.findIndex(account => account.id === id)
		const accountSelected = accounts[index]
		const accountUpdated = {
			...accountSelected,
			...AccountWithUpdate,
			updatedAt: new Date().toISOString(),
		}

		accounts.splice(index, 1, accountUpdated)
		save()

		return accountUpdated
	}

	return {
		add,
		getAll,
		deleteById,
		updatedById,
	};
}
