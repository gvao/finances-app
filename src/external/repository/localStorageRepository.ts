import { Account } from "../../core/account/model";
import { Repository } from "../../core/shared/repository";

export default async function localStorageRepository(
  repositoryName: string
): Promise<Repository> {
  const accounts: Account[] = (await getAll()) || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function save(data: any) {
    accounts.push(data);
    localStorage.setItem(repositoryName, JSON.stringify(accounts));
  }

  async function getAll() {
    const data = localStorage.getItem(repositoryName);
    if (!data) {
      throw new Error(`Not found ${repositoryName} in local database`);
    }

    return await JSON.parse(data);
  }

  return {
    save,
    getAll,
  };
}
