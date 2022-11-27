import React, { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({userData,logOut}) {

//  useLayoutEffect(() => {
//   if(window.location.pathname.split('/').splice(1,1).join()!=null){
//     document.querySelector(`.${window.location.pathname.split('/').splice(1,1).join()}`).classList.add('active')

//   }
//  }, [])
  

    function dispalyActive(e){
      let allLinks = document.querySelectorAll('.nav-link')
      for (const link of allLinks) {
        link.classList.remove('active')    
      }
      (e).classList.add('active');

      


      if(window.innerWidth<992){
      document.querySelector(".navbar-toggler").click();
      }
      }

  
  return <>
  
  <nav className="navbar navbar-expand-lg navbar-dark   ">
  <div className="container">
    <Link className="navbar-brand" to="/">
    <img src={require("../../Imgs/faviconCopy.jpg")} alt="Logo" width="150" />
      <h2  className='mainColorText text-center'>My Food</h2>
    </Link>
    <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userData? <ul className="navbar-nav me-auto  align-items-center mb-2 mb-lg-0">
        <li  className="nav-item">
          <Link onClick={(e)=>dispalyActive(e.target)}  className="nav-link position-relative  home " aria-current="page" to="/home">Home</Link>
        </li>
        
        <li className="nav-item">
          <Link onClick={(e)=>{dispalyActive(e.target);localStorage.removeItem('dataMeal')}} className="nav-link position-relative meals " to="/meals">Meals</Link>
        </li>
        <li className="nav-item">
          <Link onClick={(e)=>dispalyActive(e.target)}  className="nav-link position-relative categories " to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link  onClick={(e)=>dispalyActive(e.target)} className="nav-link position-relative area " to="/area">Area</Link>
        </li>
        <li className="nav-item">
          <Link onClick={(e)=>dispalyActive(e.target)} className="nav-link position-relative  ingredients" to="/ingredients">Ingredients</Link>
        </li>
      </ul> : ""}
     
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
   
        
       
       
        <li className="nav-item me-4">
        <i className='fa-brands mx-2   fa-facebook-f '></i>
        <i className='fa-brands mx-2  fa-twitter '></i>
        <i className='fa-brands mx-2  fa-instagram '></i>
        <i className='fa-brands mx-2  fa-github '></i>
        </li>
        {userData?  <>
          <li className="nav-item">
          <span onClick={logOut} className="nav-link position-relative cursorPointer " >LogOut</span>
        </li>
        <li className="nav-item">
          <Link  onClick={(e)=>dispalyActive(e.target)} className="nav-link position-relative profile " to="/profile">Profile</Link>
        </li>
        </>:  <>
        <li className="nav-item">
       <Link  onClick={(e)=>dispalyActive(e.target)}  className="nav-link position-relative  register " aria-current="page" to="/register">Register</Link>
     </li>
     <li className="nav-item">
       <Link onClick={(e)=>dispalyActive(e.target)} className="nav-link position-relative login " to="/login">Login</Link>
     </li>
   
     </>}
      
     
      
      
      
   
      </ul>
     
    </div>
  </div>
</nav>
  
  
  
  
  </>
}
