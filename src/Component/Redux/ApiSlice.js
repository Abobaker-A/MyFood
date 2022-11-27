import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



export let categMeals = createAsyncThunk ('Meals/categMeals', async ()=>{
    let {data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    return data.categories
})
export let getAreaApi = createAsyncThunk ('Meals/AreaApi', async ()=>{
    let {data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    return data.meals
})
export let getingredients = createAsyncThunk ('Meals/getIngredientsAreaApi', async ()=>{
    let {data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    return data.meals
})


let initialState = {loading:false , categData : [] ,  areaData : [] , ingredientsData:[]}



let apiSlice =  createSlice({
    name : "apiHome",
    initialState ,
    extraReducers:(builder)=>{
        builder.addCase(categMeals.fulfilled , (state , action)=>{
            state.categData=action.payload;
            state.loading=false;
            
        });
        builder.addCase(categMeals.pending, (state )=>{
            state.loading=true;
            
        });
        builder.addCase(categMeals.rejected, (state )=>{
            state.categData=null;
            state.loading=false;            
        })
       /////////////////////////////////////
       builder.addCase(getAreaApi.fulfilled , (state , action)=>{
        state.areaData=action.payload;
        state.loading=false;
        
    });
    builder.addCase(getAreaApi.pending, (state )=>{
        state.loading=true;
        
    });
    builder.addCase(getAreaApi.rejected, (state )=>{
        state.areaData=null;
        
    })
    //////////////////////////////////
    builder.addCase(getingredients.fulfilled , (state , action)=>{
        state.ingredientsData=action.payload;
        state.loading=false;
        
    });
    builder.addCase(getingredients.pending, (state )=>{
        state.loading=true;
        
    });
    builder.addCase(getingredients.rejected, (state )=>{
        state.ingredientsData=null;
        state.loading=false;
        
    })

    }

});
export let categDataMeals = apiSlice.reducer;