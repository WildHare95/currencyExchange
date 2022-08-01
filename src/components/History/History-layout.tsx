import { FC, useEffect, useState } from "react"
import { ListGroup } from "react-bootstrap"
import { ArrowRight } from "react-bootstrap-icons"

import "./History-styles.scss"

interface Props {
    firstValue: string | undefined
    secondValue: string | undefined
}


const HistoryLayout: FC<Props> = ({ firstValue, secondValue }) => {

    const [history, setHistory] = useState<Props[]>([])

    useEffect(() => {
        const handle = setTimeout(() => {
            if(firstValue && parseFloat(firstValue) > 0) {
                setHistory([...history, {firstValue, secondValue}])
            }
        }, 1750)

        return () => {
            clearTimeout(handle)
        }
    }, [firstValue])

    return (
        <ListGroup as="ol" numbered >
            {
                history.map((item, index) => {
                    return (
                        <ListGroup.Item variant="primary" as="li" key={index}>
                            <span>{item.firstValue}</span>
                            <ArrowRight color="red" size={24} />
                            <span>{item.secondValue}</span>
                        </ListGroup.Item>

                    )
                })
            }
        </ListGroup>
    )
}

export default HistoryLayout