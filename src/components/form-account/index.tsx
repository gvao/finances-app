import styles from "./styles.module.css";

import { ChangeEvent, FormEvent, useState } from "react";
import { useAccountContext } from "../../context/accounts";
import { Account } from "../../core/account";
import { Input } from "../common";

function useFormAccount() {
	const [data, setData] = useState<Partial<Account>>({
		name: "",
		total: 0,
		date: new Date().toISOString(),
	});

	const { addAccount, changeShowForm } = useAccountContext();

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const elem = event.target as HTMLFormElement;

		addAccount(data);
		changeShowForm();

		alert(`Enviado nova despesa no extrato!`);

		elem.reset();
	};

	const onChangeInput = ({
		target: { id, value },
	}: ChangeEvent<HTMLInputElement>) => {
		setData((state) => ({ ...state, [id]: value }));
	};

	return {
		data,
		onSubmit,
		onChangeInput,
	};
}

export function FormAccount() {
	const { data, onSubmit, onChangeInput } = useFormAccount();

	const [dateDefault] = data.date!.split(".");

	return (
		<form onSubmit={onSubmit} className={styles.formComponent}>
			<h2>Adicionar conta</h2>

			<div className={styles.inputs}>
				<Input
					onChange={onChangeInput}
					name="name"
					id="name"
					placeholder="Titulo para conta"
					value={data.name}
					autoFocus
				/>
				<Input
					onChange={onChangeInput}
					type="number"
					step={0.05}
					name="total"
					id="total"
					placeholder="Valor da conta"
					value={data.total}
				/>
				<Input
					onChange={onChangeInput}
					value={dateDefault || ""}
					type="date"
					name="date"
					id="date"
				/>
				<Input
					onChange={onChangeInput}
					value={dateDefault || ""}
					type="time"
					name="date"
					id="date"
				/>
			</div>

			<button type="submit" className={styles.formButton}>
				Adicionar
			</button>
		</form>
	);
}

