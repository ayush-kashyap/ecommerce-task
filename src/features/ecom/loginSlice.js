import { createSlice } from "@reduxjs/toolkit";

export const loginSlice=createSlice(
    {
        name:'login',
        initialState:{
            loggedin:localStorage.getItem("token")
        },
        reducers:{
            setLogin:(state,action)=>{
                state.loggedin=action.payload
            },
            logOut:(state)=>{
                localStorage.removeItem('token')
                state.loggedin=!state.loggedin
            }
        }
    }
)

export const {setLogin,logOut}=loginSlice.actions

export default loginSlice.reducer