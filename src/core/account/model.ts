import Id from "../shared/id.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Account extends Record<string, any> {
  name: string;
  total: number;
  createAt?: Date;
  id?: string;
}

export function CreateAccount({ name, total, id }: Account): Account {
  const createAt = new Date();

  return {
    name,
    total,
    id: Id(id),
    createAt,
  };
}