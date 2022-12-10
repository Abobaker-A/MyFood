import React from 'react'
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Profile() {
  let {userData} = useSelector((state)=>state.Apis);
  useEffect(() => {
    
    document.querySelector(".nav-item .profile")?.click();
  
    
  }, [])
  
  
    let{first_name,last_name,age ,email} = userData ;
  return <>
   <Helmet>
  <meta name="description" content="Profile Page"/>
    <meta name="keywords" content="Profile Page Meals Food city Country  "/>
    <title>{first_name}-My Food</title>
  </Helmet>
  <div className="container">
    <div className="row justify-content-center align-items-center">
        <div className="col-12 text-center">
            <h2 className='display-1 mainColorText fw-bolder'>Hello <span className='text-white'>{first_name}</span> </h2>
        </div>

        <div className="col-md-12 pt-5">
        <h2 className='h3 mainColorText fw-bolder'>Full Name : <span className='text-white'>{first_name}  {last_name}</span> </h2>
        </div>
        <div className="col-md-12">
        <h2 className='h3 mainColorText fw-bolder'>Your Age  : <span className='text-white'> {age} Years Old</span> </h2>
        </div>
        <div className="col-md-12">
        <h2 className='h3 mainColorText fw-bolder'>Your E-mail  : <span className='text-white'> {email}</span> </h2>
        </div>
    </div>
  </div>
  
  
  </>
}
