import { Account, CreateAccount } from "..";
import { getLastItem } from "../../../utils/getLastItem";
import { Repository } from "../../shared/repository";

export async function insertAccount(
	repository: Repository<Account>,
	{ name, total, date }: Partial<Account>
) {
	const records = await repository.getAll()

	const lastItem = getLastItem(records);

	let balance = Number(total);

	if (lastItem) {
		balance = +lastItem.balance + +total!;
	}

	const account = CreateAccount({ name, total, date, balance });

	repository.add(account);
	return account;
}
