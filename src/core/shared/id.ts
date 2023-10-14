import { v4, validate } from "uuid";

export default function Id(id?: string) {
  let value: string = "";

  if (!id) return (value = v4());

  if (!validate(id)) throw new Error("Invalid id");

  value = id;
  return value;
}
