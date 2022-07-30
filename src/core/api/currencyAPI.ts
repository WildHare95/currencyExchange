import { currencyUrl, UAH } from "../constants/constants";
import { ExchangeRate } from "../models/models";

export const currencyAPI = {
    getExchangeRates: () => {
        return fetch(currencyUrl)
        .then(response => response.json())
        .then((response: ExchangeRate[]) => {
            const res = response.map(item => {
                if(item.ccy === "BTC") {
                    item.buy = (+item.buy * 36.56).toString()
                    item.sale = (+item.sale * 36.56).toString()
                }
                return item
            })
            return [...res, UAH]
        }) as Promise<ExchangeRate[]>;

    }
}