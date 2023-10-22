import { Account } from "..";
import { Repository } from "../../shared/repository";

export async function getAllAccounts(
	repository: Repository
): Promise<Account[]> {
	return await repository.getAll();
}
