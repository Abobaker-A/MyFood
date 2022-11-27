
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import  axios  from 'axios';



export let getMealsBySerach = createAsyncThunk("Meals/search ", async ( t )=>{
    if(t[0]==="f"&& t[1].length>1){
      t[1] = t[1].slice(0,1)
    }else if (t[0]==="f" && t[1].length===0){
         t = ["s",""]
    }
    let{data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?${t[0]}=${t[1]}`)
    return  data.meals   
})

export let getMeals = createAsyncThunk("Meals/getMeals ", async ( x  )=>{
    let{data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${x[0]}=${x[1]}`);
    return  data.meals   
})

let initialState ={loadings:false , mealsData : null }

let searchSlice = createSlice({
    
    name : 'searchSlice',
    initialState,
    extraReducers : (builder)=>{
        builder.addCase(getMealsBySerach.fulfilled , (state , action)=>{
            state.mealsData = action.payload;
            state.loadings=false;
        });
        builder.addCase(getMealsBySerach.pending , (state )=>{
            state.loadings=true;

        });
        builder.addCase(getMealsBySerach.rejected , (state )=>{
            state.mealsData = null;
            state.loadings=false;

        })
        /////////////////////////////////////
        builder.addCase(getMeals.fulfilled , (state , action)=>{
            state.mealsData = action.payload;
            state.loadings=false;
            
            
        });
        builder.addCase(getMeals.pending , (state )=>{
            state.loadings=true;

        });
        builder.addCase(getMeals.rejected , (state )=>{
            state.mealsData = null;
            state.loadings=false;

        })

    }

});
export let mealData = searchSlice.reducer ;