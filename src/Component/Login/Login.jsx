import React , { useEffect, useState }from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Joi from 'joi';
import { Helmet } from 'react-helmet';
import { saveUserData } from '../Redux/ApiSlice';
import { useDispatch } from 'react-redux';

export default function Login() {
  let dispatch =useDispatch();
  let navigate = useNavigate();
  const [errorApi, setErrorApi] = useState(null)
  const [errorList, setErrorList] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    email :"",
    password :"",
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
    UserApi()
    setErrorList([])
    }
    }

    useEffect(() => {
  document.querySelector(".nav-item .login")?.click();
      
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
    

  async function UserApi(){
    let{data} = await axios.post(`https://sticky-note-fe.vercel.app/signin`,user)
    if(data.message === 'success'){
      setIsLoading(false)
      localStorage.setItem('userToken',data.token);
      localStorage.setItem('userId', data.user._id );
      dispatch(saveUserData() );
      navigate("/");
      
    }else{
      setIsLoading(false)
      setErrorApi(data.message)
    }
  }



  function validateUserForm(){
    let schema = Joi.object({
      email :Joi.string().email({tlds:{allow:['com','net']}}).required(),
      password: Joi.string().pattern(/^[a-z]{3,10}/i)
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
  <meta name="description" content="Login Page"/>
    <meta name="keywords" content="Login Meals Food city Country  "/>
    <title>Login</title>
  </Helmet>
  <section className="h-100 bg-black ">
  <div className="container py-5 h-100 ">
    <div className="row d-flex justify-content-center align-items-center h-100 ">
      <div className="col ">
        <div className="card card-registration my-4 ">
          <div className="row g-0 align-items-center bg-black">
          <div className="col-xl-6 text-white bg-black">
              <div className="card-body p-md-5 ">
                <h3 className="mb-5 text-uppercase">Login Form</h3>

                <form onSubmit={submitUser}>
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
                <div className="d-flex justify-content-between align-items-center pt-3">
                  <Link to={'/register'} >Dont Have Account? Register</Link>
                  <button className={ `subBtn btn btn-info btn-lg ms-2 ${ isLoading?"disabled px-5":"" } ` }>{isLoading?<i className='fas fa-spinner fa-spin'></i>:"Login"}</button>
                </div>

                </form>
            
               

              </div>
            </div>
            <div className="col-xl-6 d-none d-xl-block text-white bg-black ">
              <img src={require('../../Imgs/mermeladamora.jpg')} alt="Sample" className="img-fluid "  />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  
  
  
  </>
}
