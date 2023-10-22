import { Account, CreateAccount } from "..";
import { Repository } from "../../shared/repository";

export function insertAccount(repository: Repository, { name, total }: Partial<Account>) {
	const account = CreateAccount({ name, total });

	repository.add(account);
	return account
}
