import Id from "../shared/id.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Account extends Record<string, any> {
  name: string;
  total: number;
  date: Date;
  createAt: Date;
  id?: string;
}

export function CreateAccount({ name, total, id, date: dateAsString }: Partial<Account>): Account {
  
  if(!name || !total || !dateAsString) throw new Error(`Name, date or total required`)

  
  const createAt = new Date();
  const date = new Date(dateAsString)
  
  return {
    id: Id(id),
    name,
    total,
    createAt,
    date,
  };
}