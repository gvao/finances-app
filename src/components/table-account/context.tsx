import { createContext, FocusEvent, useContext } from "react";
import { useAccountContext } from "../../context/accounts";
import { transformCurrency } from "../../utils";
import { Account } from "../../core/account";

type TableProps = {
	updateAccountProperty: (account: Account) => {
		setName: (
			event: FocusEvent<HTMLTableDataCellElement, Element>
		) => Promise<void>;
		setTotalValue: (
			total: number
		) => (
			event: FocusEvent<HTMLTableDataCellElement, Element>
		) => Promise<void>;
	};
    validateNumber: (input: string | null) => number | null;

};

const TableContext = createContext<TableProps>({} as TableProps);
export const useTableContext = () => useContext(TableContext);

export default function TableContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { updateAccount } = useAccountContext();

	const updateAccountProperty = (account: Account) => {
		const setName = async (
			event: FocusEvent<HTMLTableDataCellElement, Element>
		) => {
			const { textContent } = event.currentTarget as Element;

			const newValue = { ...account, name: textContent || "" };

			await updateAccount(account.id!, newValue);
		};

		const setTotalValue = (total: number) =>
			async (event: FocusEvent<HTMLTableDataCellElement, Element>) => 
            {
				const target = event.currentTarget;
				target.textContent = `R$ ${transformCurrency(total)}`;

				const newValue = { ...account, total };

				await updateAccount(account.id!, newValue);
			};

		return {
			setName,
			setTotalValue,
		};
	};

	const convertTextInNumber = (textContent: string | null) =>
		Number(textContent?.replace("R$ ", "").replace(",", ".").trim());

	const getSomeNumbers = (input?: string) => {
		if (!input) throw new Error('Input does not contain numbers');
		const numberSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		const filterNumbers = (character: string) =>
			character === "," || numberSet.includes(Number(character));

		return input!.split("").filter(filterNumbers).join("").trim();
	};

	const validateNumber = (input: string | null) => {
        if(!input) return null

		return convertTextInNumber(getSomeNumbers(input));
	};

	return (
		<TableContext.Provider
			value={{
				updateAccountProperty,
				validateNumber,
			}}
		>
			{children}
		</TableContext.Provider>
	);
}
