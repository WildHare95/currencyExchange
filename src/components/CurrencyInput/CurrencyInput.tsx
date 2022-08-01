import { ChangeEvent, FC } from "react"
import { Card, Form, Placeholder } from "react-bootstrap"

interface Props {
    currencies: string[] | undefined
    amount: string | undefined,
    currency: string | undefined
    handleCurrency: (currency: string) => void
    handleAmount: (amount: string) => void
}

const CurrencyInput: FC<Props> = ({ currencies, amount, currency, handleAmount, handleCurrency }) => {

    const onChangeValueSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const currency = event.target.value
        handleCurrency(currency)
    }

    const onChangeValueInput = (event: ChangeEvent<HTMLInputElement>) => {
        const amount = event.target.value
        handleAmount(amount)
    }

    return (
        <div>
            {
                currencies ?
                    <>
                        <Form.Control
                            size="lg"
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
        </div>
    )
}

export default CurrencyInput