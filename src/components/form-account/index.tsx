import styles from "./styles.module.css";

import { ChangeEvent, FormEvent, useState } from "react";
import { useAccountContext } from "../../context/accounts";
import { Account } from "../../core/account";

function useFormAccount() {
	const [data, setData] = useState<Partial<Account>>({
		name: "",
		total: 0,
		date: new Date,
	});

	const { addAccount, changeShowForm } = useAccountContext();

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const elem = event.target as HTMLFormElement

		addAccount(data);
		changeShowForm()

		elem.reset()
	};

	const onChangeInput = ({
		target: { id, value },
	}: ChangeEvent<HTMLInputElement>) => {
		setData((state) => ({ ...state, [id]: value }));
	};

	console.log(data)
	return {
		data,
		onSubmit,
		onChangeInput,
	};
}

export function FormAccount() {

	const { data, onSubmit, onChangeInput } = useFormAccount();

	return (
		<form onSubmit={onSubmit} className={styles.formComponent}>
			<h2>Adicionar conta</h2>

			<div className={styles.inputs}>
				<input
					onChange={onChangeInput}
					className={styles.field}
					type="text"
					name="name"
					id="name"
					placeholder="Titulo para conta"
					value={data.name || ""}
					autoFocus
				/>
				<input
					onChange={onChangeInput}
					className={styles.field}
					type="number"
					step={0.05}
					name="total"
					id="total"
					placeholder="Valor da conta"
					value={data.total || ""}
				/>

				<input className={styles.field} type="date" name="date" id="date" onChange={onChangeInput} />
			</div>

			<button type="submit" className={styles.formButton}>
				Adicionar
			</button>
		</form>
	);
}
