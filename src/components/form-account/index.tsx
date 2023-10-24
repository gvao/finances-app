import styles from "./styles.module.css";

import { ChangeEvent, FormEvent, useState } from "react";
import { useAccountContext } from "../../context/accounts";
import { Account } from "../../core/account";

function useFormAccount() {
	const [data, setData] = useState<Partial<Account>>({
		name: "",
		total: 0,
	});
	const { addAccount } = useAccountContext();

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		addAccount(data);

		console.log(`Account additing successfully`);
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
					type="text"
					name="total"
					id="total"
					placeholder="Valor da conta"
					value={data.total || ""}
				/>
			</div>

			<button type="submit" className={styles.formButton}>
				Adicionar
			</button>
		</form>
	);
}
