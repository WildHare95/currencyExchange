import { FC, useEffect, useState } from "react"

import "./Card-styles.scss"
import { Card, Form } from "react-bootstrap"

import CurrencyInput from "../CurrencyInput/CurrencyInput"

import calculateExchange from "../../core/utils/сalculation-functions"
import { Rates } from "../../core/models/models"
import HistoryLayout from "../History/History-layout"

interface Props {
  rates: Rates | undefined
  currencies: string[] | undefined
  switcher: boolean
  onChangeCost: () => void
}

const CardLayout: FC<Props> = ({ rates, currencies, switcher, onChangeCost }) => {
  const [fromCurrencyValue, setAmountBefore] = useState<string>()
  const [toCurrencyValue, setAmountAfter] = useState<string>()
  const [fromCurrencyName, setCurrencyBefore] = useState("USD")
  const [toCurrencyName, setCurrencyAfter] = useState("EUR")

  useEffect(() => {
    if (toCurrencyValue) handleAmountChangeTo(toCurrencyValue.toString())
  }, [toCurrencyName])

  useEffect(() => {
    if (fromCurrencyValue) handleAmountChangeFrom(fromCurrencyValue.toString())
  }, [fromCurrencyName, rates])

  const handleCurrencyChangeFrom = (currency: string) => {
    if (currency === toCurrencyName) {
      setCurrencyAfter(fromCurrencyName)
      setCurrencyBefore(currency)
    } else setCurrencyBefore(currency)

  }

  const handleCurrencyChangeTo = (currency: string) => {
    if (currency === fromCurrencyName) {
      setCurrencyBefore(toCurrencyName)
      setCurrencyAfter(currency)
    } else setCurrencyAfter(currency)
  }

  const handleAmountChangeFrom = (amount: string) => {
    const firstValue = +rates![fromCurrencyName as keyof Rates]
    const secondValue = +rates![toCurrencyName as keyof Rates]

    const valueBefore = calculateExchange(+amount, firstValue, secondValue)
    const _amountAfter = valueBefore.toFixed(Math.round(1 / valueBefore).toString().length + 1)

    setAmountBefore(amount)
    if (toCurrencyName === "BTC") setAmountAfter(_amountAfter)
    else setAmountAfter(_amountAfter)
  }

  const handleAmountChangeTo = (amount: string) => {
    const firstValue = +rates![fromCurrencyName as keyof Rates]
    const secondValue = +rates![toCurrencyName as keyof Rates]

    const valueAfter = calculateExchange(+amount, secondValue, firstValue) 
    const _amountBefore = valueAfter.toFixed(Math.round(1 / valueAfter).toString().length + 1)

    setAmountAfter(amount)   
    if (fromCurrencyName === "BTC") setAmountBefore(_amountBefore)
    else setAmountBefore(_amountBefore)
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <CurrencyInput
            handleCurrency={handleCurrencyChangeFrom}
            handleAmount={handleAmountChangeFrom}
            currencies={currencies} amount={fromCurrencyValue} currency={fromCurrencyName} />

          <CurrencyInput
            handleCurrency={handleCurrencyChangeTo}
            handleAmount={handleAmountChangeTo}
            currencies={currencies} amount={toCurrencyValue} currency={toCurrencyName} />

          <Form.Check
            type="switch"
            label={switcher ? "Sale" : "Buy"}
            onClick={onChangeCost}
          />
        </ Card.Body>
      </Card>
      {
        <HistoryLayout firstValue={fromCurrencyValue} secondValue={toCurrencyValue} />
      }
    </div>

  )
}

export default CardLayout