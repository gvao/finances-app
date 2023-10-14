import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
  
import "./styles/App.css";
import styles from "./styles/despesas.module.css";

import { transformDate, transformCurrency } from "./utils";
import { Account, getAllAccounts, saveAccount } from "./core/account";
import localStorageRepository from "./external/repository/localStorageRepository";

function useApp() {
  const [data, setData] = useState<Account>({ name: "", total: 0 });
  const [accounts, setAccounts] = useState<Account[]>([]);

  const repository = localStorageRepository("contas");

  useEffect(() => {
    (async () => {
      const accounts = await getAllAccounts(await repository);

      setAccounts(accounts);
    })();
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const newAccount: Account = {
      ...data,
      createAt: new Date(),
    };

    const newData = [...accounts, newAccount];

    saveAccount(await repository, newAccount);
    setAccounts(newData);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value, id },
  }) => setData((state) => ({ ...state, [id]: value }));

  return {
    onSubmit,
    onChange,
    data,
    accounts,
  };
}

function App() {
  const { onSubmit, onChange, data, accounts } = useApp();

  return (
    <main className={`container`}>
      <header>
        <h1>Finances</h1>
        <h2>Minhas finança em um só lugar!</h2>
      </header>

      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type="text"
          name="name"
          id="name"
          onChange={onChange}
          value={data.name || ""}
        />

        <input
          type="number"
          step="0.05"
          name="total"
          id="total"
          value={data.total || 0}
          onChange={onChange}
        />

        <button type="submit">Enviar</button>
      </form>

      <ListExpenses accounts={accounts} />
    </main>
  );
}

const ListExpenses = ({ accounts }: { accounts: Account[] }) => (
  <ul className={styles.Expenses}>
    {accounts.map((account, i) => (
      <li key={i} className={styles.item}>
        <p>{account.name}</p>
        <p>R$ {transformCurrency(account.total, { compactDisplay: "long" })}</p>
        <p>{transformDate(account.createAt as Date)}</p>
      </li>
    ))}
  </ul>
);

export default App;
