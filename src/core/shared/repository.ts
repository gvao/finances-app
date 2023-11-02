import { Account } from "../account/model";

export interface Repository<T> {
  add(data: Account): Promise<void>;
  
  deleteById(id: string): Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll(): Promise<Array<T>>;

  updatedById(id: string, newValue: T): Promise<Account>
}
