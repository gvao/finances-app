import { Account, CreateAccount } from "..";
import { Repository } from "../../shared/repository";

export function insertAccount(repository: Repository, { name, total, date }: Partial<Account>) {
	const account = CreateAccount({ name, total, date });

	repository.add(account);
	return account
}
