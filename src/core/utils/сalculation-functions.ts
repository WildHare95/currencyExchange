const calculateExchange = (amount: number, fromCourse: number, toCourse: number) => {
        const res = amount * fromCourse / toCourse
        return res
}


export default calculateExchange


