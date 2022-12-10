import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import  jwtDecode  from 'jwt-decode';



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


let initialState = {loading:false , categData : [] ,  areaData : [] , ingredientsData:[] ,userData:null}

if(localStorage.getItem('userToken')!==null){
    initialState.userData ={}
}

let apiSlice =  createSlice({
    name : "apiHome",
    initialState ,
    reducers:{
         saveUserData : (state)=>{
            let enCode = localStorage.getItem('userToken');
            let deCode = jwtDecode(enCode);
            state.userData=deCode;
          },

           logOut:(state)=>{
            localStorage.removeItem('userToken');
            state.userData=null;
          }
    },
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
export let {saveUserData ,logOut } = apiSlice.actions;