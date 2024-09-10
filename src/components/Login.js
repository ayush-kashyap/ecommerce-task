import { Flex, Form, Input, Alert, Button, Row, Col } from "antd";
import React, { useRef, useState } from 'react'
import Loader from "./Loader";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "../features/ecom/loginSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const Navi=useNavigate()
    const dispatch=useDispatch()
    const [message, setMsg] = useState("Some Error Occurred")
    const [type, setType] = useState("error")
    const [showAlert, setAlert] = useState(false)
    const [loading, setLoader] = useState(false)

    const onSubmitForm = async (values) => {
        setLoader(true)
        await Axios.post("https://fakestoreapi.com/auth/login", values).then(res => {
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                Navi('/')
                dispatch(setLogin(res.data.token))
            }
        }).catch(err => {
            setAlert(true)
        })
        setLoader(false)
    }
    return (
        <>
        {loading?<Loader></Loader>:null}
        <Flex justify="center" align="center" style={{ height: "100vh" }} vertical>
            {showAlert&&<Alert onClose={()=>{setAlert(false)}} type={type} message={message} style={{position:"absolute",top:'1rem',right:"1rem" }} closable/>}
            <h2>Login To Ecommerce Website</h2>
            <Form onFinish={onSubmitForm} style={{ width: "50%" }}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Username is required"
                        }
                    ]}
                >
                    <Input placeholder="Enter your Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: "Password is required"
                    }]}
                    label="Password"
                >
                    <Input.Password placeholder="Enter your Password" />
                </Form.Item>
                <Form.Item >
                    <Button  type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Flex>
        </>
    )
}
