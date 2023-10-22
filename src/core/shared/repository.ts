import { Account } from "../account/model";

export interface Repository {
  add(data: Account): Promise<void>;
  
  deleteById(id: string): Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll(): Promise<any>;

}
