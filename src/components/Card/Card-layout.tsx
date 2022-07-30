import { FC, useEffect, useState } from "react"

import "./Card-styles.scss"
import { Form } from "react-bootstrap"

import CurrencyInput from "../CurrencyInput/CurrencyInput"

import calculateExchange from "../../core/utils/сalculation-functions"
import { Rates } from "../../core/models/models"

interface Props {
  rates: Rates | undefined
  currencies: string[] | undefined 
  switcher: boolean
  onChangeCost: () => void
}

const CardLayout: FC<Props> = ({ rates, currencies, switcher,  onChangeCost}) => {
  const [amountBefore, setAmountBefore] = useState<number>()
  const [amountAfter, setAmountAfter] = useState<number>()
  const [currencyBefore, setCurrencyBefore] = useState("USD")
  const [currencyAfter, setCurrencyAfter] = useState("EUR")

  useEffect(() => {
    if (amountAfter) handleAmountChange(amountAfter.toString(), "after")
  }, [currencyAfter])

  useEffect(() => {
    if (amountBefore) handleAmountChange(amountBefore.toString(), "before")
  }, [currencyBefore, rates])

  const handleCurrencyChange = (currency: string, name: "before" | "after") => {
    switch (name) {
      case "before":
        if (currency === currencyAfter) {
          setCurrencyAfter(currencyBefore)
          setCurrencyBefore(currency)
        } else {
          setCurrencyBefore(currency)
        }
        break
      case "after":
        if (currency === currencyBefore) {
          setCurrencyBefore(currencyAfter)
          setCurrencyAfter(currency)
        } else {
          setCurrencyAfter(currency)
        }
        break
    }
  }

  const handleAmountChange = (amount: string, name: "before" | "after") => {
    const firstValue = +rates![currencyBefore as keyof Rates]
    const secondValue = +rates![currencyAfter as keyof Rates]

    switch (name) {
      case "before":
        setAmountBefore(+amount)
        setAmountAfter(calculateExchange(+amount, firstValue, secondValue))
        break
      case "after":
        setAmountAfter(+amount)
        setAmountBefore(calculateExchange(+amount, secondValue, firstValue))
        break
    }
  }

  return (
    <div>
      <CurrencyInput
        handleCurrency={handleCurrencyChange}
        handleAmount={handleAmountChange}
        name="before"
        currencies={currencies} amount={amountBefore} currency={currencyBefore} />

      <CurrencyInput
        handleCurrency={handleCurrencyChange}
        handleAmount={handleAmountChange}
        name="after"
        currencies={currencies} amount={amountAfter} currency={currencyAfter} />

      <Form.Check
        type="switch"
        label={switcher ? "Sale" : "Buy"}
        onClick={onChangeCost}
      />
    </div>
  )
}

export default CardLayout