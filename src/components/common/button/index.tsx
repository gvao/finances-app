import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

export default function Button({
	children,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button className={styles.button} {...props}>
			{children}
		</button>
	);
}
