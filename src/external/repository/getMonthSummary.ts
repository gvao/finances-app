import { Account, getAllAccounts } from "../../core/account";
import { Repository } from "../../core/shared/repository";
import { FormatDate } from "../../utils";
import { getLastItem } from "../../utils/getLastItem";

export async function getSummaryMonth(
	repository: Repository<Account>,
	currentDate: Date | string
) {
	const repo = await getAllAccounts(repository);

	const records = repo.filter((account) => {
		const date =
			typeof currentDate === "string"
				? new Date(currentDate)
				: currentDate;

		const isMonthMatch =
			date.getMonth() + 1 ===
			Number(FormatDate(account.date, { month: "2-digit" }));

		const isYearMatch =
			date.getFullYear() ===
			Number(FormatDate(account.date, { year: "numeric" }));

		return isMonthMatch && isYearMatch;
	});

	const { balance } = getLastItem(records);

	// const balance = records.reduce(
	// 	(acc, account) => (acc = acc + +account.total),
	// 	0
	// );

	return {
		balance,
		records,
	};
}
