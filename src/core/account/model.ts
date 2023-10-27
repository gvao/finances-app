import Id from "../shared/id.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Account extends Record<string, any> {
  name: string;
  total: number;
  date: string;
  createAt: Date;
  id?: string;
}

export function CreateAccount({ name, total, id, date }: Partial<Account>): Account {
  
  if(!name || !total || !date) throw new Error(`Name, date or total required`)
  
  const createAt = new Date();
  
  return {
    id: Id(id),
    name,
    total,
    createAt,
    date,
  };
}