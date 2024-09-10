import { EyeFilled, ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import { Card, Flex, Row, Col, Button, Badge, Select } from 'antd'
import Axios from 'axios'
import Header from './Header'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../features/ecom/countSlice'
import { addItem } from '../features/ecom/cartSlice'
import { updateItem } from '../features/ecom/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader'


export default function Home() {
    const Navi=useNavigate()
    const { Meta } = Card
    const dispatch = useDispatch()
    const [items, setItems] = useState()
    const [category, setCategory] = useState("")
    const loggedin=useSelector(state=>state.login.loggedin)
    const itemsCart=useSelector(state=>state.cart.cart.items)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const func = async () => {
            Axios.get(`https://fakestoreapi.com/products/${category}`).then(
                res => {
                    setItems(res.data || [])
                    setLoading(false)
                }
            ).catch(err => {
                alert("Some error occurred")
            })
        }
        func()
    }, [category])

    const addToCart = (item) => {
        if(loggedin){
            dispatch(increment())
            if(itemsCart.find(obj=>obj.id===item.id)){
                dispatch(updateItem(item))
            }else
            dispatch(addItem(item))
        }else{
            Navi("/login")
        }
    }
    const sortResult = (value) => {
        setCategory(value)
    }
    return (

        <>

            <Row style={{ height: "3rem" }} align={'middle'} justify={'end'}>
                <Col>
                    Filter :&nbsp; 
                    <Select defaultValue={"All"}
                        style={{ width: "10rem", marginRight: "1rem" }}
                        onChange={sortResult}
                        options={[
                            { value: "", label: "All" },
                            { value: "category/men's clothing", label: "men's clothing" },
                            { value: "category/jewelery", label: "jewelery" },
                            { value: "category/electronics", label: "electronics" },
                            { value: "category/women's clothing", label: "women's clothing" },
                        ]}
                    >

                    </Select>
                </Col>
            </Row>
            <Row style={{ minHeight: "100vh", backgroundColor: 'whitesmoke' }} justify={'center'}  >
                {loading ? <Loader /> : items.map((item) => {
                    return (
                        <Col xs={20} sm={8} md={6} lg={6} xl={6}  >

                            <Card
                                style={{ minWidth: "20vw", height: "fit-content", padding: "1rem", margin: "1rem 0.5rem", boxShadow: '0px 1px 5px rgba(0,0,0,0.1)' }}
                                type='inner'
                                cover={<img style={{ height: '35vh' }} src={item.image} />}
                            >
                                <Meta title={item.title} description={`$${item.price}`} />
                                <Row>
                                    <Col span={20}><small style={{ color: "green" }}>{item.category}</small></Col>
                                    <Col span={4}><em>{item.rating.rate}<StarFilled style={{ color: 'gold' }}></StarFilled></em></Col>
                                </Row>
                                <Button style={{ margin: '1rem 0 0 0', width: "100%" }} onClick={()=>{addToCart(item)}} iconPosition='end' type='primary' icon={<ShoppingCartOutlined />}> Add to Cart</Button>
                                <Link to={`/product/${item.id}`} >
                                    <Button style={{ margin: '1rem 0 0 0', width: "100%" }} iconPosition='end' type='primary' icon={<EyeFilled />}> View Product</Button>
                                </Link>
                            </Card>

                        </Col>
                    )
                })}
            </Row>
        </>
    )
}
