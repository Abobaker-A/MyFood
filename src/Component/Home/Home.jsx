import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadPage from '../LoadPage/LoadPage';
import { Helmet } from 'react-helmet';
import { categMeals, getAreaApi, getingredients } from './../Redux/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getMeals } from './../Redux/SearchSlice';
import $ from "jquery";




export default function Home() {
  let dispatch = useDispatch()
  let {categData , loading ,areaData ,ingredientsData } = useSelector((state)=>state.Apis)
  let navigate = useNavigate()

useEffect(() => {
  dispatch(categMeals())
  dispatch(getAreaApi())
  dispatch(getingredients())
  $("section.Categories").hide(10000)

  return () => {
  }
}, [dispatch])

  

  return <>
   <Helmet>
  <meta name="description" content="Home Page"/>
    <meta name="keywords" content="MyFoop Meals Food city Country  "/>
    <title>My Food</title>
  </Helmet>
  {loading?<LoadPage/>:<>
  <>
  {categData?<section className='py-5 Categories '>
      <div className='container py-5'>
        <div className="row gy-5 py-5 justify-content-center  align-items-center ">
          <div className="col-xl-4 col-md-6 col-sm-8 cursorPointer">
            <div className={" text-center"}>
            <Link to={"/categories"} className=' title display-3 fw-bold'> Categories </Link>
            </div>
          </div>
          {categData.slice(0,9).map((categ,indx) => <div key={indx}   className="col-xl-2 col-md-3 col-sm-4 ">
            <div onClick={async()=>{await dispatch(getMeals(["c",categ.strCategory])) ; await navigate('/meals') }}  className={`title text-center cursorPointer`}>
              <img className='w-100' src={categ.strCategoryThumb} alt="Logo" />
            <h3 > {categ.strCategory} </h3>
            </div>
          </div>)}
          <div className="col-xl-2 col-md-3 col-sm-4">
          <div className={"title text-center"}>
            <Link to={"/ingredients"} className='title display-5 fw-bold'> More... </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>:""}
    {areaData?<section className='py-5 Area'>
      <div className='container py-5'>
        <div className="row gy-5 py-5   align-items-center ">
          <div className="col-xl-4 col-md-6 col-sm-8 cursorPointer">
            <div className={"title text-center"}>
            <Link to={"/area"} className='display-1 title fw-bold'> Area </Link>
            </div>
          </div>
          {areaData.slice(0,9).map((area,indx) => <div    key={indx} className="col-xl-2 col-md-3 col-sm-4 cursorPointer">
            <div className='item' onClick={async()=>{await dispatch(getMeals(["a",area.strArea])) ; await navigate('/meals') }}>
              <div  className="rounded-2  text-center cursor-pointer">
                          <i className="fa-solid mainColorText fa-city  fa-5x"></i>
                          <h3 className=" fw-semibold ">{area.strArea}</h3>
                  </div>
            </div>
          </div>)}
          <div className="col-xl-2 col-md-3 col-sm-4">
          <div className={"title text-center"}>
            <Link to={"/area"} className='display-5 title fw-bold'> More... </Link>
            </div>
          </div>
  
          
        </div>
      </div>
    </section>:""}
    
  {ingredientsData? <section className='py-5 Ingredients '>
      <div className='container py-5'>
        <div className="row gy-5 py-5   align-items-center ">
          <div className="col-xl-4 col-md-6 col-sm-8 cursorPointer">
            <div className={" title text-center"}>
            <Link to={"/ingredients"}  className='display-3 title fw-bold'> Ingredients </Link>
            </div>
          </div>
          {ingredientsData.slice(0,9).map((ingred,indx) => <div key={indx}    className="col-xl-2 col-md-3 col-sm-4 cursorPointer">
            <div onClick={async()=>{await dispatch(getMeals(["i",ingred.strIngredient])) ;await navigate('/meals') }} className={`item text-center`}>
              <div  className="rounded-2  text-center cursor-pointer">
                    <i className="fa-solid text-success fa-bowl-food fa-4x"></i>
                          <h3 className=" fw-semibold ">{ingred.strIngredient}</h3>
                          <p>{ingred.strDescription.split(" ").length > 15?ingred.strDescription.split(" ").splice(0, 10).join(" ")+'...':ingred.strDescription}</p>
                  </div>
            </div>
          </div>)}
  
          <div className="col-xl-2 col-md-3 col-sm-4 cursorPointer">
          <div className={"title text-center"}>
            <Link to={"/ingredients"} className='display-5 title fw-bold'> More... </Link>
            </div>
          </div>
        
        </div>
      </div>
    </section>:""}
  </>
  </>}
  
 
   
    </>
  
  

 
  
  
  
  
  
  
  
  
}
