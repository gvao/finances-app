import { Account } from "../account/model";

export interface Repository {
  save(data: Account): Promise<void>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll(): Promise<any>;
}
