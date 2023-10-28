import { Account } from "..";
import { Repository } from "../../shared/repository";

export async function deleteAccountById(repository: Repository<Account>, id: string) {
	await repository.deleteById(id);
}