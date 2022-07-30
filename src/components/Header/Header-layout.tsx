import { FC } from "react"
import Nav from 'react-bootstrap/Nav'
import { Navbar, Container, Placeholder } from 'react-bootstrap'

import "./Header-styles.scss"

interface Props {
    exchangeRateBuy: string[] | undefined
}

const Header: FC<Props> = ({ exchangeRateBuy }) => {
    return (
        <div className="header">
            <Navbar expand="lg">
                <Container>
                    {
                        exchangeRateBuy ?
                            exchangeRateBuy?.map(item => <Nav className="navbar-text" key={item}>{item}</Nav>) :
                            < >
                                <Placeholder xs={1} size="lg" />
                                <Placeholder xs={1} size="lg" />
                                <Placeholder xs={1} size="lg" />
                                <Placeholder xs={1} size="sm" />
                            </>
                    }
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
