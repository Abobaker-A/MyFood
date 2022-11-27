import React, { useEffect } from 'react'
import style from "./meals.module.css";
import { Link } from 'react-router-dom';
import LoadPage from '../LoadPage/LoadPage';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { getMealsBySerach } from './../Redux/SearchSlice';


export default function Meals() {
   let {mealsData , loadings} =  useSelector((state)=>state.meals);
   let dispatch = useDispatch()


    useEffect(() => {
        if(!mealsData){
            dispatch(getMealsBySerach(["s",""]))
        }
    }, [dispatch, mealsData])  
  return <>
   <Helmet>
  <meta name="description" content="Meals Page"/>
    <meta name="keywords" content=" Meals Food city Country  "/>
    <title>Meals</title>
  </Helmet>
  
  <div className="container w-75">
  <div className="row gy-5 py-4 ">
       <div className="col-md-6 ">
           <input  onChange={(e)=>dispatch(getMealsBySerach(["s", e.target.value]))} className={style.contantInput+" form-control bg-transparent serachinpt  text-white   rounded-0 border-0 border-bottom" }type="text" placeholder="Search By Name"/>
       </div>
       <div className="col-md-6">
           <input maxLength={1}   onChange={(e)=>dispatch(getMealsBySerach(["f", e.target.value]))}  className={style.contantInput+" form-control bg-transparent serachinpt  text-white  rounded-0 border-0 border-bottom" }type="text" placeholder="Search By First Letter"/>
       </div>
   </div>
   {!loadings ? <div className='row gy-5 justify-content-center align-items-center py-5'>
       {mealsData?mealsData.map((meal , indx)=> <Link to={"/details/"+meal.idMeal} state={{ id : meal.idMeal}} key={indx} className="col-md-6 col-lg-4 col-xl-3 cursorPointer">
               <div className={style.meal +"  position-relative overflow-hidden rounded-2 cursor-pointer"}>
                   <img className="w-100" src={meal.strMealThumb} alt="Food" />
                   <div className={ style.mealLayer+" meal-layer position-absolute d-flex align-items-center text-black p-2"}>
                       <h2 className='fw-light'>{meal.strMeal}</h2>
                   </div>
               </div>
       </Link> ):''}
       
  
   </div> : <LoadPage />}
   
      </div>  
    
   
  
  
  
  
  
  
  
  </>
}
