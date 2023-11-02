import { Account } from "..";
import { Repository } from "../../shared/repository";


export const updateAccountById = async ( repository: Repository<Account>, id: string, newAccount: Account ): Promise<Account> => {

    const updatedAccount = await repository.updatedById(id, newAccount)

    return updatedAccount
}