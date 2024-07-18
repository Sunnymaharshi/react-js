import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    // have actions and corresponding reducer functions
    reducers:{
        addItem:(state,action)=>{
            state.items.push(action.payload);
        },
        removeItem: (state,action)=>{
            state.items.pop();
        },
        clearCart:(state)=>{
            state.items.length = 0;
        }

    }
});

export const {addItem,removeItem,clearCart} = cartSlice.actions;

export default cartSlice.reducer;