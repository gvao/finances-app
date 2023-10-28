import { Account, getAllAccounts } from "../account";
import { Repository } from "../shared/repository";
import { FormatDate } from "../../utils";
import { getLastItem } from "../../utils/getLastItem";

export async function getSummaryMonth(
	repository: Repository<Account>,
	currentDate: Date
) {
	const repo = await getAllAccounts(repository);

	const records = repo.filter((account) => {
		const date = currentDate;

		const isMonthMatch =
			date.getMonth() + 1 ===
			Number(FormatDate(account.date, { month: "2-digit" }));

		const isYearMatch =
			date.getFullYear() ===
			Number(FormatDate(account.date, { year: "numeric" }));

		return isMonthMatch && isYearMatch;
	});

	const lastRecord = getLastItem(records);

	if (!lastRecord) {
		return {
			balance: 0,
			records,
		};
	}

	return {
		balance: lastRecord.balance,
		records,
	};
}
