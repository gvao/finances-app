import Id from "../shared/id.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Account extends Record<string, any> {
  name: string;
  total: number;
  createAt: Date;
  id?: string;
}

export function CreateAccount({ name, total, id }: Partial<Account>): Account {
  
  if(!name || !total) throw new Error(`Name and total required`)
  
  const createAt = new Date();
  
  return {
    id: Id(id),
    name,
    total,
    createAt,
  };
}