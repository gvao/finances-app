import Id from "../shared/id.ts";

export interface Account {
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
