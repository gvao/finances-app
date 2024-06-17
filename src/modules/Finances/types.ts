import Transaction from "./domain/transaction";

export type ContextInterface = {
    transactions: Transaction[],
    createTransaction(description: string): void,
}
