import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {  useNavigate } from 'react-router-dom';
import LoadPage from './../LoadPage/LoadPage';
import { useSelector, useDispatch } from 'react-redux';
import { getAreaApi } from '../Redux/ApiSlice';
import { getMeals } from './../Redux/SearchSlice';



export default function Area() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let { loading , areaData  } = useSelector((state)=>state.Apis)




useEffect(() => {
  document.querySelector(".nav-item .area")?.click();

  dispatch(getAreaApi());
  
}, [dispatch])

  

  return <> <></>
  <Helmet>
  <meta name="description" content="Meals By Area"/>
    <meta name="keywords" content="Area Meals Food city Country  "/>
    <title>Area</title>
  </Helmet>

  {loading?<LoadPage/>:<>
    {areaData?<section className='py-5 Area'>
      <div className='container py-5'>
        <div className="row gy-5 py-5   align-items-center justify-content-center ">
          <div className="col-12 ">
            <div className={" text-center"}>
            <h4 to={"/area"} className='display-1   fw-bold'> Area </h4>
            </div>
          </div>
          {areaData.map((area,indx) => <div    key={indx} className="col-xl-2  col-md-3 col-md-4 col-sm-6 cursorPointer">
            <div onClick={async()=>{await dispatch(getMeals(["a",area.strArea])) ;await navigate('/meals') }} className={ `item text-center`}>
              <div  className="rounded-2  text-center cursor-pointer">
                          <i className="fa-solid mainColorText fa-city  fa-5x"></i>
                          <h3 className=" fw-semibold ">{area.strArea}</h3>
                  </div>
            </div>
          </div>)}
         
  
          
        </div>
      </div>
    </section>:<LoadPage/>}
  </>}

  

 
  
  
  
  
  
  
  
  </>
}
