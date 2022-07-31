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
    if (toCurrencyValue) handleAmountChange(toCurrencyValue.toString(), "after")
  }, [toCurrencyName])

  useEffect(() => {
    if (fromCurrencyValue) handleAmountChange(fromCurrencyValue.toString(), "before")
  }, [fromCurrencyName, rates])

  const handleCurrencyChange = (currency: string, name: "before" | "after") => {
    switch (name) {
      case "before":
        if (currency === toCurrencyName) {
          setCurrencyAfter(fromCurrencyName)
          setCurrencyBefore(currency)
        } else {
          setCurrencyBefore(currency)
        }
        break
      case "after":
        if (currency === fromCurrencyName) {
          setCurrencyBefore(toCurrencyName)
          setCurrencyAfter(currency)
        } else {
          setCurrencyAfter(currency)
        }
        break
    }
  }

  const handleAmountChange = (amount: string, name: "before" | "after") => {
    const firstValue = +rates![fromCurrencyName as keyof Rates]
    const secondValue = +rates![toCurrencyName as keyof Rates]

    switch (name) {
      case "before":
        setAmountBefore(amount)
        const valueBefore = calculateExchange(+amount, firstValue, secondValue)
        if (toCurrencyName === rates!.BTC) {
          const _amountAfter = valueBefore.toFixed(Math.round(1 / valueBefore).toString().length + 1)
          setAmountAfter(_amountAfter)
        } else {
          setAmountAfter(valueBefore.toFixed(2))
        }
        break
      case "after":
        setAmountAfter(amount)
        const valueAfter = calculateExchange(+amount, secondValue, firstValue)
        if (fromCurrencyName === rates!.BTC) {
          const _amountBefore = valueAfter.toFixed(Math.round(1 / valueAfter).toString().length + 1)
          setAmountBefore(_amountBefore)
        } else {
          setAmountBefore(valueAfter.toFixed(2))
        }
        break
    }
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <CurrencyInput
            handleCurrency={handleCurrencyChange}
            handleAmount={handleAmountChange}
            name="before"
            currencies={currencies} amount={fromCurrencyValue} currency={fromCurrencyName} />

          <CurrencyInput
            handleCurrency={handleCurrencyChange}
            handleAmount={handleAmountChange}
            name="after"
            currencies={currencies} amount={toCurrencyValue} currency={toCurrencyName} />

          <Form.Check
            type="switch"
            label={switcher ? "Sale" : "Buy"}
            onClick={onChangeCost}
          />
        </ Card.Body>
      </Card>
      {
        fromCurrencyValue && toCurrencyValue && <HistoryLayout firstValue={fromCurrencyValue} secondValue={toCurrencyValue} />
      }
    </div>

  )
}

export default CardLayout