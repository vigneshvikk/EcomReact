import { createSlice } from "@reduxjs/toolkit";

const initialState={
    id:"",
    FullName:"",
    PhoneNumber:"",
    Email:"",
    Image:""

}

 export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            console.log(action.payload,'ok');
           state.id=action.payload.id
           state.FullName=action.payload.FullName
           state.PhoneNumber=action.payload.PhoneNumber
           state.Email=action.payload.Email
           state.Image=action.payload.Image

        },


        logoutRedux:(state,action)=>{
            state.id=""
            state.FullName=""
            state.PhoneNumber=""
            state.Email=""
            state.Image=""
        }

    }
 })
export const {loginRedux,logoutRedux}=userSlice.actions
 export default userSlice.reducer