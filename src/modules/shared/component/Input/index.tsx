import { InputHTMLAttributes, useId } from "react";
import styles from "./styles.module.css"

export default function Input({ type = "text", label, ...props }: Props) {
    const id = useId()
    return (
        <div className={styles.wrapper}>
            {label && <label htmlFor={id}>{label}</label>}
            <input type={type} {...props} id={id} />
        </div>
    )
}

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string }