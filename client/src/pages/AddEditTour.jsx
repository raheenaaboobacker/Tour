import React, { useState,useEffect } from 'react'
import {MDBCard,MDBCardBody,MDBCardFooter,MDBValidation,MDBBtn,MDBSpinner
         } from 'mdb-react-ui-kit'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'


const initialState={
  title:"",
  description:"",
  tags:[]
}

const AddEditTour = () => {

  const [tourData,setTourData]=useState(initialState);
  const {error,loading}=useSelector((state)=>({...state.tour}))
  const {user}=useSelector((state)=>({...state.auth}))
  const dispatch=useDispatch()

  const {title,description,tags}=tourData;

  useEffect(() => {
   error&&toast.error(error)
  }, [error])
  

  const onInputChange=(e)=>{
    const {name,value}=e.target;
    setTourData({...tourData,[name]:value})
  }

  const handleAddTag=(tag)=>{
    setTourData({...tourData,tags:[...tourData.tags,tag]})
    console.log(tourData);

  }

  const handleDeleteTag=(deleteTag)=>{
    setTourData({...tourData,
      tags:tourData.tags.filter((tag)=>tag!==deleteTag)})
      console.log(tourData);

  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(tourData);
    if(title&&description&&tags){
      const updatedTourData={...tourData,name:user?.result?.name}
    }

  }

  const handleClear=()=>{
    setTourData({title:"",description:"",tags:[]})
    console.log(tourData);

  }

  
 
  return (
    <div style={{
      margin:"auto",
      padding:"15px",
      maxWidth:"450px",
      alignContent:"center",
      marginTop:"120px"
    }} className="container">
      <MDBCard alignment='center'>
          <h5>Add Tour</h5>
          <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
            <div className="col-md-12">
              
              <input placeholder='Enter title'
              type="text"
              value={title}
              name="title"
              onChange={onInputChange}
              className='form-control'
              required
              invalid
              validation="Please Provide title"
              
              />
            </div>
            <div className="col-md-12">
              <textarea placeholder='Enter Description'
              type="text"
              value={description}
              style={{height:"100px"}}
              name="description"
              onChange={onInputChange}
              className='form-control'
              required
              invalid
              validation="Please Provide title"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
              name='tags'
              variant='outlined'
              placeholder='Enter Tag'
              fullWidth
              value={tags}
              onAdd={(tags)=>handleAddTag(tags)}
              onDelete={(tags)=>handleDeleteTag(tags)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase type='file' 
              multiple={false} 
              onDone={({base64})=>setTourData({...tourData,imageFile:base64})}
              />
            </div>
            <div className="col-12">
            <MDBBtn style={{width:"100%"}}>Submit</MDBBtn>
            <MDBBtn style={{width:"100%"}} className='mt-2' color='danger' onClick={handleClear}>clear</MDBBtn>
            </div>

          </MDBValidation>
        </MDBCardBody>
      </MDBCard>

    </div>
  )
}

export default AddEditTour