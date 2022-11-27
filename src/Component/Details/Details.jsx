import React from 'react'
import {  useParams,  } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadPage from './../LoadPage/LoadPage';
import { Helmet } from 'react-helmet';

export default function Details() {
    let params =  useParams();
    const[detailsData,setDetailsData]=useState(null);

       async function getDetails(id){
            let {data} = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            setDetailsData(data.meals[0]);
        }
       
        
        useEffect(() => {
          
            getDetails(params.id)
         
        }, [params.id])

        useEffect(() => {
          
            if(detailsData){
                let ingredients = ``
                for (let i = 1; i <= 20; i++) {
                    if (detailsData[`strIngredient${i}`]) {
                        ingredients += `<li class="alert alert-info m-2 p-1">${detailsData[`strMeasure${i}`]} ${detailsData[`strIngredient${i}`]}</li>`;
                    }
                }
                document.querySelector('.forTag').innerHTML= ingredients;
            
            }
         
        }, [detailsData])
      
        
    
  return<>
   <Helmet>
  <meta name="description" content="Meal Details"/>
    <meta name="keywords" content="Details Meals Food city Country  "/>
    <title>{detailsData?.strMeal}</title>
  </Helmet>
  {detailsData?<div className='container py-5'>
    <div className="row">

    <div className="col-md-4">
                <img className="w-100 rounded-3" src={detailsData.strMealThumb} alt=""/>
                    <h2 className='text-center mainColorText pt-3'>{detailsData.strMeal}</h2>
            </div>
            <div className="col-md-8">
                <h2>Instructions</h2>
                <p className='py-3'>{detailsData.strInstructions}</p>
                <h4 className='pb-3' ><span className="fw-bolder mainColorText">Area : </span>{detailsData.strArea}</h4>
                <h4 className='pb-3' ><span className="fw-bolder mainColorText">Category : </span>{detailsData.strCategory}</h4>
                <h4  className="fw-bolder pb-3 mainColorText" > Recipes :</h4>
                <ul className="list-unstyled forTag d-flex g-3 flex-wrap">
                
                </ul>

                <h4  className="fw-bolder mainColorText" >Tags :</h4>
                <ul className="list-unstyled d-flex g-3 flex-wrap">
                {detailsData.strTags?detailsData.strTags.split(",").map((tag , indx)=> <li key={indx} className="alert alert-danger m-2 p-1">{tag}</li>):""}
                </ul>

                <a target="_blank" href={detailsData.strSource} className="btn me-3 btn-success" rel="noreferrer">Source</a>
                <a target="_blank" href={detailsData.strYoutube} className="btn btn-danger" rel="noreferrer">Youtube</a>
            </div>
    </div>
  </div>:<LoadPage/>}
  
  
  
  
  </>
}
