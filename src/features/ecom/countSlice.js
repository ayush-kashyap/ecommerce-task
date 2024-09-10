import { createSlice } from "@reduxjs/toolkit";

export const countSlice=createSlice(
    {
        name:'count',
        initialState:{
            count:0
        },
        reducers:{
            increment:(state)=>{
                state.count+=1
            },
            decrement:(state)=>{
                state.count-=1
            },
            emptyCount:(state)=>{
                state.count=0
            }
        }
    }
)

export const {increment,decrement,emptyCount}=countSlice.actions

export default countSlice.reducer