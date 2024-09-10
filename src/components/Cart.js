import { Col, Row, Card } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Button} from 'antd'

export default function Cart() {
    const cart = useSelector(state => state.cart.cart)
    
    return (
        <Row style={{minHeight:"100vh",backgroundColor:"whitesmoke"}}>
            <Col style={{ padding: "0 2rem" }} sm={24} md={16}>
                {cart.items.map((item) => {
                    return (
                        <Card style={{margin:"1rem",height: "fit-content" }}>
                            <Row >
                                <Col md={3} xs={24}>
                                    <img src={item.itemImage} width="100%" alt="" />
                                </Col>
                                <Col md={21} xs={24} style={{paddingLeft:"2rem"}}>
                                    <h3>{item.itemName}</h3>
                                    <h4>${item.itemPrice}</h4>
                                    <h4>Quantity : {item.itemQuantity}</h4>
                                </Col>
                            </Row>
                        </Card>
                    )
                })}
            </Col>
            <Col sm={24} md={8}>
            <h3>Total Amount : ${cart.amount}</h3>
            <Button type='primary'>Buy Now</Button>
            </Col>
        </Row>
    )
}
