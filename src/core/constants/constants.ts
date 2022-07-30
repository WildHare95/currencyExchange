import { ExchangeRate } from "../models/models";

export const UAH: ExchangeRate = {
    ccy: "UAH",
    base_ccy: "UAH",
    buy: "1",
    sale: "1"
}


export const currencyUrl = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11"