import React from 'react'

export default function LoadPage({color }) {
  return<>
  <div className={ ' d-flex loading justify-content-center align-items-center bg-black h-100 w-100'}>
    <i className={color + ' fas fa-spin fa-spinner mainColorText fa-7x'}></i>
  </div>
  
  
  
  </>
}
