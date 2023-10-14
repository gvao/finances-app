import { Account } from "../core/account/model";

interface TableExpensesProps {
  accounts: Array<Account>;
}
export const TableExpenses = ({ accounts }: TableExpensesProps) => {
  if (accounts.length < 0) return null;

  const blacklist = ["id"];
  const headers = (
    accounts.length > 0 ? (Object.keys(accounts[0]) as (keyof Account)[]) : []
  ).filter((key) => !blacklist.includes(key));

  return (
    <table>
      <thead>
        <tr>
          {headers.map((key, i) => (
            <th key={`header-${key}-${i}`}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {accounts
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((account: Record<string, any>) => (
            <tr key={account.id}>
              {headers.map((key) => (
                <td key={key + "-" + account.id}>{account[key]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
