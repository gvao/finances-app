import { useAccountContext } from "../../context/accounts";
import styles from "./styles.module.css";

export function Popup({ children }: { children: React.ReactNode }) {
	const { changeShowForm } = useAccountContext();

	const onclick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		const target = event.target as HTMLElement;

		const classList = Array.from(target.classList);
		const isClose = classList.some((className) => className.includes("wrapper"));
		if (isClose) return changeShowForm();
	};

	return (
		<section onClick={onclick} className={styles.wrapper}>
			<div className={`container ${styles.popup}`}>{children}</div>
		</section>
	);
}
