import { FormEvent } from "react";
import styles from "./styles.module.css";

export default function FormAccount() {
    
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log(`FormAccount has been submitted successfully `)
    }

	return (
		<form onSubmit={onSubmit} className={styles.formComponent}>
			<h2>Adicionar conta</h2>

			<div className={styles.inputs}>
				<input
                className={styles.field}
					type="text"
					name="name"
					id="name"
					placeholder="Titulo para conta"
                    autoFocus
				/>
				<input
                className={styles.field}
					type="text"
					name="total"
					id="total"
					placeholder="Valor da conta"
				/>
			</div>

			<button type="submit" className={styles.formButton} >Adicionar</button>
		</form>
	);
}
