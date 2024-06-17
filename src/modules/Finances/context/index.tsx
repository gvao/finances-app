import { createContext, useState } from "react";
import { ChildrenProps } from "../../shared/types/children";
import { ContextInterface } from "../types";
import Transaction from "../domain/transaction";

const INITIAL_VALUES: Partial<ContextInterface> = {
    transactions: []
}
export const FinanceContext = createContext<ContextInterface>(INITIAL_VALUES as ContextInterface)

export default function FinanceContextProvider({ children }: ChildrenProps) {
    const [transactions, setTransaction] = useState<Transaction[]>(INITIAL_VALUES.transactions!)

    function createTransaction(description: string) {
        const transaction = Transaction.create(description)
        setTransaction(state => ([...state, transaction]))
    }

    return (
        <FinanceContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </FinanceContext.Provider>
    )
}