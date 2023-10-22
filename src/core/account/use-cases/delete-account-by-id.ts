import { Repository } from "../../shared/repository";

export async function deleteAccountById(repository: Repository, id: string) {
	await repository.deleteById(id);
}