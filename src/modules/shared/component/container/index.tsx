import { ChildrenProps } from '../../types/children'
import styles from './styles.module.css'

export const Container = ({ children, className }: Props) => (
    <div className={`${styles.container} ${className}`}>
        {children}
    </div>
)

type Props = ChildrenProps & { className?: string }