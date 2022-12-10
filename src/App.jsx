import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './Component/Main/Main';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Errorpage from './Component/ErorPage/Errorpage';
import Meals from './Component/Meals/Meals';
import Details from './Component/Details/Details';
import Categories from './Component/Categories/Categories';
import Area from './Component/Area/Area';
import Ingredients from './Component/Ingredients/Ingredients';
import Profile from './Component/Profile/Profile';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import LoadPage from './Component/LoadPage/LoadPage';
import { Offline } from 'react-detect-offline';
import { saveUserData } from './Component/Redux/ApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Notes from './Component/Notes/Notes';




export default function App() {

  let dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem('userToken')!==null){
      dispatch(saveUserData());
    }
  }, [])
  
  const router =createBrowserRouter([{
    path:"" , element:<Main /> , children : [
      {path:"" , element : <ProtectedRoute  ><Home/></ProtectedRoute> },
      {path:"home" , element :<ProtectedRoute  ><Home /></ProtectedRoute>  },
      {path:"login" , element : <Login  /> },
      {path:"register" , element : <Register/> },
      {path:"load" , element : <LoadPage/> },
      {path:"meals" , element :<ProtectedRoute  ><Meals /></ProtectedRoute>  },
      {path:"details/:id" , element : <ProtectedRoute  ><Details /></ProtectedRoute> },
      {path:"categories" , element : <ProtectedRoute  ><Categories /></ProtectedRoute> },
      {path:"area" , element : <ProtectedRoute  ><Area /></ProtectedRoute> },
      {path:"ingredients" , element : <ProtectedRoute  ><Ingredients /></ProtectedRoute> },
      {path:"profile" , element :<ProtectedRoute  ><Profile /></ProtectedRoute>  },
      {path:"MyFood" , element :<ProtectedRoute  ><Home /></ProtectedRoute>  },
      {path:"notes" , element :<ProtectedRoute  ><Notes /></ProtectedRoute>  },
      {path:"*" , element : <Errorpage/> },
    ]
  }])
  return <><>
    <Offline>
      <div className="position-fixed bottom-0 end-0 m-5 shadow-lg bg-light bg-opacity-25 p-4 rounded-4 OfflineLabel text-warning text-uppercase text-center"><h4>no internet connection</h4> <h6>You Are Offline</h6> </div>
    </Offline>
    <RouterProvider router={router}/>

  </>


  </>
}
