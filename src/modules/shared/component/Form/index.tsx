import { FormHTMLAttributes } from "react";
import { ChildrenProps } from "../../types/children";
import styles from "./styles.module.css"
import { Container } from "../container";

export default function Form({ children, className, ...props }: Props) {
    return (
        <Container>
            <form className={`${className} ${styles.wrapper}`} {...props}>{children}</form>
        </Container>
    )
}

type Props = Partial<ChildrenProps> & FormHTMLAttributes<HTMLFormElement>