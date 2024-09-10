import React from 'react'
import {Row,Badge,Button,Flex} from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Link,Outlet } from 'react-router-dom'
import { logOut } from '../features/ecom/loginSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { emptyCount } from '../features/ecom/countSlice'

export default function Header() {
    const dispatch=useDispatch()
    const loggedin=useSelector((state)=>state.login.loggedin)
    const count=useSelector((state)=>state.count.count)
    const logOutHandle=()=>{
        dispatch(emptyCount())
        dispatch(logOut())
    }
    return (
        <>
        <Flex justify='space-between' style={{ height: "10vh",boxShadow:'0px 1px 5px rgba(0,0,0,0.1)' }} align='center'>
            <h3 style={{ marginLeft: "1rem" }}>Ecommerce Store</h3>
            <Row>
                <Badge count={count} style={{ marginRight: "1rem" }}>
                    <Link to={'/cart'}><Button type='primary' style={{ marginRight: "1rem" }} icon={<ShoppingCartOutlined />}>Cart</Button></Link>
                </Badge>
                {loggedin?<Button style={{marginRight:"1rem"}} type='primary' onClick={logOutHandle}>Logout</Button>:<Link to='/login'><Button type='primary' style={{ marginRight: "1rem" }} >Login</Button></Link>}
                
            </Row>
        </Flex>
        <Outlet></Outlet>
        </>
    )
}
