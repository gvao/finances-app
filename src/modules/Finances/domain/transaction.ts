export default class Transaction {
    constructor(readonly description: string, readonly id: string) { }

    static create(description: string){
        const id = crypto.randomUUID()
        return new Transaction(description, id)
    }
}
