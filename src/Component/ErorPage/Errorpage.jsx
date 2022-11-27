import React from 'react'
import { Helmet } from 'react-helmet';

export default function Errorpage() {
  return <>
   <Helmet>
  <meta name="description" content="Error Page 404"/>
    <meta name="keywords" content="Error Page 404 Meals Food city Country  "/>
    <title>Error Page 404</title>
  </Helmet>
  <figure className='text-center'>
    <img src={require('./../../Imgs/404.png')} className="w-50 " alt="Error" />
  </figure>
  
  
  
  </>
}
