import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import movieReducer from './movieSlice';
import gptReducer from './gptSlice'
import configReducer from './configSlice'
import suggestionsReducer from './suggestionsSlice'


const appStore=configureStore({
    reducer:{
        user: userReducer,
        movies: movieReducer,
        gpt:gptReducer,
        config: configReducer, 
        suggestions: suggestionsReducer,     
    },
})

export default appStore;