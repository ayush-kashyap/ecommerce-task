import { Row,Col,Button } from 'antd'
import { ShoppingCartOutlined, StarFilled } from '@ant-design/icons'
import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateItem } from '../features/ecom/cartSlice'
import { increment } from '../features/ecom/countSlice'
import { addItem } from '../features/ecom/cartSlice'
import Loader from './Loader'
import { Link } from 'react-router-dom'

export default function Product() {
    const Navi=useNavigate()
    const loggedin=useSelector(state=>state.login.loggedin)
    const itemsCart=useSelector(state=>state.cart.cart.items)
    const params=useParams()
    const dispatch=useDispatch()
    const [item,setItem]=useState()
    const [loading,setLoadin]=useState(true)
    useEffect(()=>{
        const func=async()=>{
            Axios.get(`https://fakestoreapi.com/products/${params.id}`).then(res=>{
                setItem(res.data)
                setLoadin(false)
            }).catch(err=>{
                console.log(err)
            })
        }
        func()
    },[])
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
  return (
    loading?<Loader/>:<Row style={{height:"100vh"}} justify={'center'} align={'middle'}>
        <Col xs={24} sm={16} md={8} style={{height:"80%", paddingLeft:"2rem"}} >
            <img width="80%" height="100%" src={item.image} alt="" />
        </Col>
        <Col xs={24} md={16} sm={24} style={{padding:"2rem"}}>
            <h2>{item.title}</h2>
            <small>Home{">"+item.category}</small>
            <h3>${item.price}</h3>
            <Row>
                <Col><em>{item.rating.rate}<StarFilled style={{color:'gold'}}></StarFilled> </em></Col>
                <Col>&nbsp;{item.rating.count} ratings</Col>
            </Row>
            <p>{item.description}</p>
            <Row >
                <Col style={{marginRight:"1rem"}}><Button type="primary" icon={<ShoppingCartOutlined/>} onClick={()=>{addToCart(item)}}>Add to Cart</Button></Col>
                <Col><Button type="primary" onClick={()=>{addToCart(item);loggedin?Navi('/cart'):Navi("/login")}}>Buy Now</Button></Col>
            </Row>

        </Col>
    </Row>
  )
}
