import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {  useNavigate } from 'react-router-dom';
import LoadPage from './../LoadPage/LoadPage';
import { useDispatch, useSelector } from 'react-redux';
import { categMeals } from './../Redux/ApiSlice';
import { getMeals } from './../Redux/SearchSlice';


export default function Categories() {
  let dispatch = useDispatch()
  let {categData , loading   } = useSelector((state)=>state.Apis)




  let navigate = useNavigate()  

useEffect(() => {
  document.querySelector(".nav-item .categories")?.click();

  dispatch(categMeals())
  return () => {
  }
}, [dispatch])

  

  return <>
    <Helmet>
  <meta name="description" content="Meals By Category"/>
    <meta name="keywords" content="Category Meals Food city Country  "/>
    <title>Category</title>
  </Helmet>
  {loading?<LoadPage/>:<>
  {categData?<section className='py-5 Categories '>
      <div className='container '>
        <div className="row gy-5 py-5 justify-content-center  align-items-center ">
          <div className="col-12  pb-5">
            <div className={" text-center"}>
            <h4 to={"/categories"} className=' display-3 fw-bold'> Categories </h4>
            </div>
          </div>
          {categData.map((categ,indx) => <div key={indx}   className="col-xl-2  col-md-3 col-md-4 col-sm-6">
            <div onClick={async()=>{await dispatch(getMeals(["c",categ.strCategory])) ;await navigate('/meals') }}  className={`title text-center cursorPointer`}>
              <img className='w-100' src={categ.strCategoryThumb} alt="Logo" />
            <h3 > {categ.strCategory} </h3>
            </div>
          </div>)}
          
          
        </div>
      </div>
    </section>:<LoadPage/>}
  
  </>}
  
  

 
  
  
  
  
  
  
  
  </>
}
