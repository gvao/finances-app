import { Container } from "../shared/component/container";
import { ChildrenProps } from "../shared/types/children";
import styles from "./styles.module.css"
import "./styles/globals.css"

export default function Layout({ children }: ChildrenProps) {
    return (
        <Wrap>
            <Header />
            <Main>{children}</Main>
            <Footer />
        </Wrap>
    )
}

const Wrap = ({ children }: ChildrenProps) => (
    <div className={styles.wrap}>{children}</div>
)

export const Main = ({ children }: ChildrenProps) => (
    <main className={styles.main} >
        {children}
    </main>

)

export const Header = () => (
    <header className={styles.headerWrap} >
        <Container className={styles.header}>
            <span>headers</span>
            <button>voltar</button>
        </Container>
    </header>
)

export const Footer = () => (
    <footer className={styles.footer}></footer>
)
