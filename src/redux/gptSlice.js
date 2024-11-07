import { createSlice } from "@reduxjs/toolkit";

const gptSlice=createSlice({
    name:'gpt',
    initialState:{
        showGptSearch:false,
        trailerId:null,
    },
    reducers:{
        toggleGptSearchView:(state, action)=>{
            state.showGptSearch=!state.showGptSearch;
        },
        addTrailerId: (state, action) => {
            state.trailerId = action.payload;
          },

    }
})

export const {toggleGptSearchView, addTrailerId}=gptSlice.actions
export default gptSlice.reducer