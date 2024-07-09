import {createSlice,configureStore} from '@reduxjs/toolkit'

const authslice = createSlice({
    name:"auth",
    initialState:{
        islogin:false
    },
    reducers:{
        login(state){
            state.islogin = true
        },
        logout(state){
            state.islogin = false
        }
    },
   
})

export const authActions = authslice.actions
export const store = configureStore({
    reducer: authslice.reducer
})