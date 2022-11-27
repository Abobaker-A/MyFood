import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';


export default function Main({userData,logOut}) {



  return <>
  <Navbar logOut={logOut}  userData={userData}/>
  <Outlet/>
  <Footer/>

  </>
}
