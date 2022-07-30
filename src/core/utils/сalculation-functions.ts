const calculateExchange = (amount: number, firstValue: number, secondValue: number) => {
        const res = amount * firstValue / secondValue
        return res < 0 ? 0 : +res.toFixed(2)
}

export default calculateExchange


