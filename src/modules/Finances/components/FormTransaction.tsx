import { ChangeEventHandler, FormEvent, useContext, useState } from "react"
import { FinanceContext } from "../context"
import Form from "../../shared/component/Form"
import Input from "../../shared/component/Input"
import Button from "../../shared/component/Button"
import Title from "../../shared/component/Title"
import { Container } from "../../shared/component/container"
import styles from "./styles.module.css"

export default function FormTransaction() {
    const { onSubmit, onChange } = useFormTransaction()
    return (
        <Container className={styles.wrap}>
            <Title>Nova transação</Title>
            <Form onSubmit={onSubmit}>
                <Input label='description' type="text" name="description" id="description" onChange={onChange} />
                <Button type="submit">create</Button>
            </Form>
        </Container>
    )
}

const useFormTransaction = () => {
    const { createTransaction } = useContext(FinanceContext)
    const [description, setDescription] = useState('')

    function onSubmit(event: FormEvent) {
        event.preventDefault()
        createTransaction(description)
        const form = event.target as HTMLFormElement
        form.reset()
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => { setDescription(value) }

    return {
        onSubmit,
        onChange
    }
}