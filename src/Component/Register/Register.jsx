import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadPage from '../LoadPage/LoadPage';
import { Helmet } from 'react-helmet';
  


export default function Register() {
  let navigate = useNavigate();
  const [errorApi, setErrorApi] = useState(null)
  const [errorList, setErrorList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    first_name :"",
    last_name :"",
    email :"",
    password :"",
    age : 0 
  })
  function getUser(e){
    setErrorList(null)
    let newUser = {...user}
    newUser[e.target.id]= e.target.value
    setUser(newUser)
  }
  
  function submitUser(e){
    setIsLoading(true)
    e.preventDefault();
    let validation = validateUserForm()
    if(validation.error){
      setIsLoading(false)
      setErrorList(validation.error.details)

    }else{
    sendUserApi()
    setErrorList([])
    }
    }
    useEffect(() => {
      
      document.querySelector('.showPass').addEventListener('mousedown',function(e){
          e.target.previousElementSibling.type='text'
          e.target.classList.replace('fa-eye-slash',"fa-eye")        
      })
      document.querySelector('.showPass').addEventListener('mouseup',function(e){
          e.target.previousElementSibling.type='password'
          e.target.classList.replace('fa-eye',"fa-eye-slash")
      })

    
      return () => {
        
      }
    }, [])
    

  async function sendUserApi(){
    let{data} = await axios.post(`https://sticky-note-fe.vercel.app/signup`,user)
    if(data.message === 'success'){
      setIsLoading(false)
      navigate("/login");
    }else{
      setIsLoading(false)
      setErrorApi(data.message)
    }
  }
  function validateUserForm(){
    let schema = Joi.object({
      first_name :Joi.string().min(3).max(20).required() ,
      last_name :Joi.string().min(3).max(20).required() ,
      email :Joi.string().email({tlds:{allow:['com','net']}}).required(),
      password: Joi.string().pattern(/^[a-z]{3,10}/i),
      age : Joi.number().min(16).max(60).required()
    });
    return schema.validate(user ,{abortEarly:false});

  }


  function showError (key){
    if(errorList){
      for (let i = 0; i < errorList.length; i++) {

        if(errorList[i].context.label === key){
          return errorList[i].message;
        }
        
      }
      return"";
    }
    
   
  }

  return <>
   <Helmet>
  <meta name="description" content="Register Page"/>
    <meta name="keywords" content="Register Meals Food city Country  "/>
    <title>Register</title>
  </Helmet>
  {isLoading?<LoadPage/>:<section className="h-100 bg-black ">
  <div className="container py-5 h-100 ">
    <div className="row d-flex justify-content-center align-items-center h-100 ">
      <div className="col ">
        <div className="card card-registration my-4 ">
          <div className="row g-0 align-items-center bg-black">
            <div className="col-xl-6 d-none d-xl-block text-white bg-black ">
              <img src={require('../../Imgs/steamy-pasta-marked-1-of-1.jpg')} alt="Sample" className="img-fluid "  />
            </div>
            <div className="col-xl-6 text-white bg-black">
              <div className="card-body p-md-5 ">
                <h3 className="mb-5 text-uppercase">Registration Form</h3>


                <form onSubmit={submitUser}>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="first_name">First Name</label>
                  <input  onChange={getUser} type="text" id="first_name" className="form-control form-control-lg " placeholder='First Name' />
                  {showError("first_name")?<div ><p className='text-danger alert mt-1'>{showError("first_name")}</p></div>:""}                    
                  
                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="last_name">Last Name</label>
                  <input onChange={getUser} type="text" id="last_name" className="form-control form-control-lg " placeholder='Last Name' />
                  {showError("last_name")?<div ><p className='text-danger alert mt-1'>{showError("last_name")}</p></div>:""}                    


                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="age">Age</label>
                  <input onChange={getUser} type="number" id="age" className="form-control form-control-lg " placeholder='Age' />
                  {showError("age")?<div ><p className='text-danger alert mt-1'>{showError("age")}</p></div>:""}                    


                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">E-Mail</label>
                  <input onChange={getUser} type="email" id="email" className="form-control form-control-lg " placeholder='E-Mail' />
                  {showError("email")?<div ><p className='text-danger alert mt-1'>{showError("email")}</p></div>:""}                    


                </div>
                <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password">Password</label>
                <div className='position-relative'>
                <input onChange={getUser} type="password" id="password" className="form-control form-control-lg " placeholder='Password' />
                <i className="fa-solid showPass fa-xl fa-eye-slash cursorPointer position-absolute end-0 top-50 translate-middle-y me-3"></i>
                </div>
                {showError("password")?<div ><p className='text-danger alert mt-1'>Password Must Be From 3 to 8 Charcters </p></div>:""}                    


                </div>
                {errorApi?<div className='alert alert-danger'>{errorApi}</div>:"" }
                <div className="d-flex justify-content-end pt-3">
                  <button type="reset" className="btn btn-outline-danger btn-lg">Reset all</button>
                  <button className="subBtn btn btn-info btn-lg ms-2">"Register"</button>
                </div>
                </form>
            

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>}
  
  
  
  
  
  
  </>
}
