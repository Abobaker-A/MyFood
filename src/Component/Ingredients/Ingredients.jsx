import  { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import LoadPage from './../LoadPage/LoadPage';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getingredients } from './../Redux/ApiSlice';
import { getMeals } from './../Redux/SearchSlice';


export default function Categories() {
  let dispatch = useDispatch()
  let {  loading  ,ingredientsData } = useSelector((state)=>state.Apis)



  let navigate = useNavigate()

useEffect(() => {
  dispatch(getingredients())

  return () => {
  }
}, [dispatch])

  

  return <>
   <Helmet>
  <meta name="description" content="Meals By Ingredients"/>
    <meta name="keywords" content="Ingredients Meals Food city Country  "/>
    <title>Ingredients</title>
  </Helmet>
  {loading?<LoadPage/>:<>
  {ingredientsData? <section className='py-5 Ingredients '>
      <div className='container py-5'>
        <div className="row gy-5 py-5   justify-content-center ">
          <div className="col-12">
            <div className={" text-center"}>
            <h4 to={"/ingredients"}  className='display-3  fw-bold'> Ingredients </h4>
            </div>
          </div>
          {ingredientsData.slice(0,42).map((ingred,indx) => <div key={indx}    className="col-xl-2  col-md-3 col-md-4 col-sm-6 cursorPointer">
            <div onClick={async()=>{await dispatch(getMeals(["i",ingred.strIngredient])) ;await navigate('/meals') }} className={`item text-center`}>
              <div  className="rounded-2  text-center cursor-pointer">
                    <i className="fa-solid text-success fa-bowl-food fa-4x"></i>
                          <h3 className=" fw-semibold ">{ingred.strIngredient}</h3>
                          <p>{ingred.strDescription?ingred.strDescription.split(" ").splice(0, 10).join(" "):"Have Not Description"}</p>
                  </div>
            </div>
          </div>
          
          )}
  
         
        
        </div>
      </div>
    </section>:<LoadPage/>}
  </>}
  
  

 
  
  
  
  
  
  
  
  </>
}
