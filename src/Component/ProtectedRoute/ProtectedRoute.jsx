import React from 'react'
import Login from '../Login/Login';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({children}) {
    let{userData} =useSelector((state)=>state.Apis);
    if(userData===null){
        return <Login />
    }else{
        return children
    }
  
}
