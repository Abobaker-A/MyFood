import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import  axios from 'axios';
import Swal from 'sweetalert2'
import LoadPage from './../LoadPage/LoadPage';

export default function Notes() {

let{userData} =useSelector((state)=>state.Apis);

let token = localStorage.getItem('userToken');
let userID = userData._id;

const [userInfo, setUserInfo] = useState({token,userID})
const [addNote, setAddNote] = useState({title:"",desc:"",token,citizenID:userID})
const [notesData, setNotesData] = useState(null)
const [noNotes, setNoNotes] = useState(false);
const [loading, setLoading] = useState(false);




const getNotes =async()=>{
  setLoading(true);
  let {data} = await axios.post(`https://sticky-note-fe.vercel.app/getUserNotes`,userInfo);
  console.log(data);
if(data.message ==="success"){
  setNoNotes(false);
    setNotesData(data.Notes);
  }
   else if(data.message ==="no notes found"){
    setNoNotes(true);
  }
  setLoading(false);

}

function getNote (e){
  setAddNote({...addNote,[e.target.name]:e.target.value});
}


async function addNotes(e){
  
  e.preventDefault();
  let {data} = await axios.post(`https://sticky-note-fe.vercel.app/addNote`,addNote);
  console.log(data);
  if(data.message ==="success"  ){
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      background : "#333",
      color:"#fff",
      timer: 1500
    })
    document.querySelector('#formAdd').reset();
    getNotes();
  }else{

  }

}
async function deleteNote (NoteID){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to Delete this Note!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#000',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Delete it!',
    background : "#333",
    color:"#fff"
  })
  .then((result) => {
    if (result.isConfirmed) {
        axios.delete(`https://sticky-note-fe.vercel.app/deleteNote`, {
            data:{
                token,
                NoteID
            }
        })
        .then((response)=>{
            console.log(response)
            if(response.data.message==="deleted"){
              getNotes();
                Swal.fire(
                  {
                    title:   `Deleted!`,
                    text: `Your file has been deleted.`,
                   icon: 'success',
                    background : "#333",
                    color:"#fff",
                     timer: 1500,
                     showConfirmButton: false,
                  }
              
              )
            }
        })
    }
  })
}

function updateNote (note){
document.getElementById('uptitle').value=note.title;
document.getElementById('updesc').value=note.desc;
setAddNote({...addNote,"title" : note.title ,"desc":note.desc ,"NoteID":note._id } );
}
async function noteUpdate (e){
  e.preventDefault();
  let {data} = await axios.put(`https://sticky-note-fe.vercel.app/updateNote`,addNote);
  if(data.message ==="updated"  ){
     Swal.fire({
      icon: 'success',
      title: 'Your Note has been UpDated',
      showConfirmButton: false,
      background : "#333",
      color:"#fff",
      timer: 1500
    })
    getNotes();
  }


}


  useEffect(() => {
  document.querySelector(".nav-item .notes")?.click();

    getNotes()
  
  }, [])
  



  return <>
  {loading? <LoadPage/> : <>
  <div className="container text-end">
  <h2 className='display-1 pt-5 text-center'>Notes</h2>
<button type="button" className="btn btn-outline-warning fw-bolder px-5 py-3     fs-4 " data-bs-toggle="modal" data-bs-target="#exampleModal">
<i className="fa-solid fa-plus"></i> Add Note
</button>
  </div>

  
{/*//////////////////////////////////////////////// Moadal Add/////////////////////////////////////////// */}
<div className="modal fade  " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog ">
    <div className="modal-content bg-dark">
      
      <form id='formAdd' onSubmit={addNotes}>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="form-outline mb-4">
        <input onChange={getNote} name="title" type="text" id="title" className="form-control form-control-lg  " placeholder='Type Title' />

        </div>
      <div className="form-outline mb-4">
                <textarea onChange={getNote} name="desc" type="text" id="desc" rows={6} className="form-control form-control-lg bg-black " placeholder='Type Your Note' ></textarea>

                </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn fw-semibold btn-outline-danger" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn fw-semibold btn-outline-info" data-bs-dismiss="modal"><i className="fa-solid fa-plus pe-2"></i>Add Note</button>
      </div>
      </form>
      
    </div>
  </div>
</div>
{/*//////////////////////////////////////////////// Moadal update /////////////////////////////////////////// */}
<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog ">
    <div className="modal-content bg-dark">
      
      <form id='formupdate' onSubmit={noteUpdate}>
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">UpDate Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="form-outline mb-4">
        <input onChange={getNote} type="text" name="title" id="uptitle" className="form-control form-control-lg  " placeholder='Type Title' />

        </div>
      <div className="form-outline mb-4">
                <textarea  onChange={getNote} name="desc" type="text" id="updesc" rows={6} className="form-control form-control-lg bg-black " placeholder='Type Your Note' ></textarea>

                </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn fw-semibold btn-outline-danger" data-bs-dismiss="modal">Close</button>
        <button type="submit" className="btn fw-semibold btn-outline-info" data-bs-dismiss="modal">Update</button>
      </div>
      </form>
      
    </div>
  </div>
</div>
{/* ////////////////////display Notes////////////////////////////////////// */}
  {noNotes?<>
  <div className='p-5'> 
  <h2 className='text-center display-1 fw-bolder text-danger'>No Notes ..</h2>
  <h2 className='text-center display-1 fw-bolder text-danger'>You Can Add Note</h2>
  </div>
  </>
  :<div className="container bootstrap snippets bootdeys ">
<div className="row justify-content-center ">
{notesData?.map((note )=>
    <div className="col-xl-4 col-xl-3 col-md-6  content-card p-md-3 p-5   " key={note._id}>
    <div className="card-big-shadow  " >
        <div className="card bg-black card-just-text border border-warning rounded-5 border-5 border-opacity-25" data-background="color" data-color="blue" data-radius="none">
            <div className="content   p-5 ">
                <h2 className="h3 text-warning text-center">{note.title}</h2>
                <p className=" notedesc text-white">{note.desc}</p>
               
            </div>
            <div className='d-flex justify-content-around mb-5'>
                <button onClick={()=>deleteNote(note._id)} className='btn btn-outline-danger'><i className="fa-solid fa-trash-can"></i></button>
                <button   onClick={()=>updateNote(note)} className='btn btn-outline-info' data-bs-toggle="modal" data-bs-target="#exampleModal1"><i className="fa-solid fa-pen-to-square"></i></button>
                </div>
        </div> 
    </div>
</div>
    
    )}
    

</div>
</div>
}
  </>}
  
  
  
  </>
  
}
