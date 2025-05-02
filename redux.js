/*
    Redux 
        state management library 
        allows u to have a global state 
        Store 
            can have multiple slices 
            slice 
                responsible for particular domain of app 
                ex: userSlice, cartSlice etc 
                createSlice 
                    to create a slice 
                    ex:counterSlice =  createSlice({
                        name:"user",
                        {value:0},  // initial state
                        reducers:{
                        }
                    })
                    export default counterSlice.reducer;
        Actions 
            used to tell redux what it should do to the state 
            type is mandatory, payload is optional field 
            ex: { type:"increment", payload: 1 }
        Reducers 
            responsible for taking action and update the store 
            never makes update to store directly 
            replaces the state with new updated state 
            here increment is an action, we export it 
            like export const {increment} = counterSlice.actions;
            ex: reducers: {
                increment: (state, action)=>{
                    state.value += action.payload;
                }
            }
            redux internaly does replace prev state with new state 
        configureStore
            from reduxjs/toolkit 
            creates and configure the store 
            ex: store =  configureStore({   
                reducer:{
                    counter: counterReducer,
                }
            })
        Provider 
            from react-redux 
            allows store access to component and all it's children 
        useSelector Hook 
            from react-redux 
            ex: count  = useSelector((state)=>state.counter.value)
        useDispatch Hook 
            from react-redux
            ex: dispatch = useDispatch();
                dispatch(increment(3)) // increment action
        Asynchronous Actions
            createAsyncThunk()
                ex: incrementAsync = createAsyncThunk({
                    "counter/incrementAsync",
                }, async (amount)=>{
                    await new Promise((resolve)=> setTimeout(resolve,1000));
                    return amount;
                })
            in slice 
                {
                    extraReducers: (builder)=>{
                        builder
                        .addCase(incrementAsync.pending, ()=>{
                            console.log("increment async pending");
                        })
                        .addCase(incrementAsync.fulfilled, (state,action)=>{
                            state.value += action.payload;
                        })
                    }
                }
 */
