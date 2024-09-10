import { LoadingOutlined } from '@ant-design/icons'
import { Flex,Spin } from 'antd'
import React from 'react'

export default function Loader() {
  return (
    <Flex justify='center' vertical style={{ zIndex:'99',height:"100vh",width:"100vw",position:"absolute",top:"0",left:"0",backgroundColor:"rgba(255, 255, 255, 0.836)"}} align='center'>
        <Spin indicator={<LoadingOutlined style={{fontSize:50}}/>}></Spin>
        Loading...
    </Flex>
  )
}
