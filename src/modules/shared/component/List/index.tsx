import { ChildrenProps } from "../../types/children";
import { Container } from "../container";
import styles from './styles.module.css'

export const List = ({ children }: ChildrenProps) => (
    <Container className={styles.wrapper}>
        <ul>{children}</ul>
    </Container>
)
