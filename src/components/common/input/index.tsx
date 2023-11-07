import { DetailedHTMLProps } from "react";
import styles from './styles.module.css'

export const Input = ({
	...props
}: DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) => <input className={styles.field} {...props} />;
