import { ChangeEvent, FC } from "react"
import { Card, Form, Placeholder } from "react-bootstrap"

interface Props {
    currencies: string[] | undefined
    amount: string | undefined,
    currency: string | undefined
    name: "before" | "after"
    handleCurrency: (currency: string, name: "before" | "after") => void
    handleAmount: (amount: string, name: "before" | "after") => void
}

const CurrencyInput: FC<Props> = ({ currencies, amount, currency, name, handleAmount, handleCurrency }) => {

    const onChangeValueSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const currency = event.target.value
        const name = event.target.name as "before" | "after"
        handleCurrency(currency, name)
    }

    const onChangeValueInput = (event: ChangeEvent<HTMLInputElement>) => {
        const amount = event.target.value
        const name = event.target.name as "before" | "after"
        handleAmount(amount, name)
    }

    return (
        <>

            {
                currencies ?
                    <>
                        <Form.Control
                            size="lg"
                            name={name}
                            type="number"
                            value={amount || ""}
                            autoComplete="off"
                            onChange={onChangeValueInput}
                            onFocus={event => event.target.select()}
                            className="mb-2"
                        />
                        <Form.Select
                            size="lg"
                            onChange={onChangeValueSelect}
                            name={name}
                            value={currency}
                            className="mb-2"
                        >
                            {
                                currencies.map((currency) => (
                                    <option key={currency} value={currency}>{currency}</option>
                                ))
                            }
                        </Form.Select>
                    </>
                    :
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={12} size="lg" bg="info" />
                        <Placeholder xs={12} size="lg" />
                    </Placeholder>
            }
        </>
    )
}

export default CurrencyInput