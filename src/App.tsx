import { useEffect, useState } from 'react';

import './App.scss';
import { Card } from 'react-bootstrap';

import CardLayout from './components/Card/Card-layout';
import Header from './components/Header/Header-layout';

import { currencyAPI } from './core/api/currencyAPI';
import { ExchangeRate, Rates } from './core/models/models';


function App() {

  const [rates, setRates] = useState<Rates>()
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate[]>()
  const [currencies, setCurrencies] = useState<string[]>()
  const [exchangeRateBuy, setExchangeRateBuy] = useState<string[]>()
  const [switcher, setSwitcher] = useState(false)

  useEffect(() => {
    currencyAPI.getExchangeRates()
      .then(response => {

        setExchangeRate(response)

        const correncies = response.map(value => value.ccy)
        setCurrencies(correncies)
      })

  }, [])

  useEffect(() => {
    if (exchangeRate) {
      const exchangeRateBuy = exchangeRate.map(value => {
        const amount = switcher ? value.buy : value.sale
        return `${value.ccy}: ${(+amount).toFixed(2)}`
      })
      setExchangeRateBuy(exchangeRateBuy)

      const rates = exchangeRate.reduce<Rates>((accum, next) => {
        const key = next.ccy
        const value = switcher ? next.buy : next.sale
        return { ...accum, [key]: value }
      }, {} as Rates)
      setRates(rates)
    }
  }, [switcher, exchangeRate])


  const onChangeCost = () => {
    setSwitcher(value => !value)
  }

  return (
    <>
      <Header exchangeRateBuy={exchangeRateBuy} />
      <Card>
        <Card.Body>
          <CardLayout rates={rates} currencies={currencies} switcher={switcher} onChangeCost={onChangeCost} />
        </ Card.Body>
      </Card>
    </>
  );
}

export default App;
