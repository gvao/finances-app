import { Account, CreateAccount } from "..";
import { Repository } from "../../shared/repository";

export function saveAccount(repository: Repository, { name, total }: Account) {
	const account = CreateAccount({ name, total });

	repository.save(account);

	console.log(account);
}