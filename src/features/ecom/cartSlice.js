import { createSlice } from "@reduxjs/toolkit";

export const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cart:{
            amount:0,
            items:[]
        }
    },
    reducers:{
        addItem:(state,action)=>{
            const item={
                id:action.payload.id,
                itemName:action.payload.title,
                itemPrice:action.payload.price,
                itemImage:action.payload.image,
                itemQuantity:1
            }
            state.cart.amount+=action.payload.price
            state.cart.items.push(item)
        },
        removeItem:(state,action)=>{
            state.items=state.cart.items.filter((item)=>item.id!==action.payload)
        },
        updateItem:(state,action)=>{
            state.items=state.cart.items.map((item)=>{
                if(item.id===action.payload.id){
                    item.itemQuantity+=1
                    state.cart.amount+=action.payload.price
                    item.itemPrice+=action.payload.price
                }
                return item
            })
        }
    }
})

export const {addItem,removeItem,updateItem}=cartSlice.actions

export default cartSlice.reducer