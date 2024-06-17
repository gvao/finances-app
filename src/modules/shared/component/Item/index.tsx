import { ChildrenProps } from "../../types/children";
import styles from "./styles.module.css"

export const Item = ({ children }: ChildrenProps) => <li className={styles.wrap}>{children}</li>