import React, { useEffect, useState } from 'react'
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
import jwtDecode from "jwt-decode";
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import LoadPage from './Component/LoadPage/LoadPage';
import { Offline } from 'react-detect-offline';
import { Provider } from 'react-redux';
import store from './Component/Redux/Store';




export default function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData (){
    let enCode = localStorage.getItem('userToken');
    let deCode = jwtDecode(enCode)
    setUserData(deCode)
  }

  useEffect(() => {
    if(localStorage.getItem('userToken')!==null){
      saveUserData();
    }
  }, [])
  
  function logOut(){
    localStorage.removeItem('userToken');
    setUserData(null)
  }
  
  

  const router =createBrowserRouter([{
    path:"" , element:<Main logOut={logOut} userData={userData}/> , children : [
      {path:"" , element : <ProtectedRoute saveUserData={saveUserData} userData={userData}><Home/></ProtectedRoute> },
      {path:"home" , element :<ProtectedRoute saveUserData={saveUserData} userData={userData}><Home /></ProtectedRoute>  },
      {path:"login" , element : <Login saveUserData={saveUserData} /> },
      {path:"register" , element : <Register/> },
      {path:"load" , element : <LoadPage/> },
      {path:"meals" , element :<ProtectedRoute saveUserData={saveUserData} userData={userData}><Meals /></ProtectedRoute>  },
      {path:"details/:id" , element : <ProtectedRoute saveUserData={saveUserData} userData={userData}><Details /></ProtectedRoute> },
      {path:"categories" , element : <ProtectedRoute saveUserData={saveUserData} userData={userData}><Categories /></ProtectedRoute> },
      {path:"area" , element : <ProtectedRoute saveUserData={saveUserData} userData={userData}><Area /></ProtectedRoute> },
      {path:"ingredients" , element : <ProtectedRoute saveUserData={saveUserData} userData={userData}><Ingredients /></ProtectedRoute> },
      {path:"profile" , element :<ProtectedRoute saveUserData={saveUserData} userData={userData}><Profile userData={userData}/></ProtectedRoute>  },
      {path:"MyFood" , element :<ProtectedRoute saveUserData={saveUserData} userData={userData}><Home /></ProtectedRoute>  },
      {path:"*" , element : <Errorpage/> },
    ]
  }])
  return <><>
    <Offline>
      <div className="position-fixed bottom-0 end-0 m-5 shadow-lg bg-light bg-opacity-25 p-4 rounded-4 OfflineLabel text-warning text-uppercase text-center"><h4>no internet connection</h4> <h6>You Are Offline</h6> </div>
    </Offline>
    <Provider store={store}>
    <RouterProvider router={router}/>

    </Provider>
  
  </>


  </>
}
