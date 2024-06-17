import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css"

export default function Button({ children, className, ...props }: Props) {
    return (
        <button className={`${styles.wrapper} ${className}`} {...props}>
            {children}
        </button>
    )
}

type Props = { className?: string } & ButtonHTMLAttributes<HTMLButtonElement>