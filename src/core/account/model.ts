import Id from "../shared/id.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Account extends Record<string, any> {
  balance: number;
  name: string;
  total: number;
  date: string;
  createAt: Date;
  id?: string;
}

export function CreateAccount({ name, total, id, date, balance }: Partial<Account>): Account {
  const createAt = new Date();
  
  if(!name || !total || !date || !balance) throw new Error(`Name, date or total required`)
  
  return {
    id: Id(id),
    name,
    total,
    createAt,
    date,
    balance,
  };
}