import { LiHTMLAttributes } from "react";
import { ChildrenProps } from "../../types/children";
import styles from "./styles.module.css"

export const Item = ({ children, className, ...props }: Props) =>
    <li className={`${className} ${styles.wrap}`} {...props}>{children}</li>

type Props = ChildrenProps & LiHTMLAttributes<HTMLLIElement>