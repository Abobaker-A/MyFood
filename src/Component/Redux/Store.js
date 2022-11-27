import { configureStore } from "@reduxjs/toolkit";
import { categDataMeals } from "./ApiSlice";
import { mealData } from './SearchSlice';



 let store = configureStore ({
    reducer :{ 
        Apis : categDataMeals ,
        meals : mealData ,
     }
});
export default store ; 