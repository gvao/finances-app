import { Account, CreateAccount } from "./model";
import { Repository } from "../shared/repository";

interface SaveAccountProps {
  name: string;
  total: number;
}

export function saveAccount(
  repository: Repository,
  { name, total }: SaveAccountProps
) {
  const account = CreateAccount({ name, total });

  repository.save(account);

  console.log(account);
}

export async function  getAllAccounts(
  repository: Repository
): Promise<Account[]> {
  return await repository.getAll();
}
