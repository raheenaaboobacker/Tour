import React,{useState,useEffect} from 'react'
import {MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner
} from 'mdb-react-ui-kit'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { googleSignIn, login } from '../redux/features/authSlice'
import {GoogleLogin} from 'react-google-login'
import jwt_decode from 'jwt-decode'


const client_id="809610477293-5fmkdu64lqrrrpp7qmpprmlqgjvd39lu.apps.googleusercontent.com"


const initialState={
    email:"",
    password:""
}

const Login = () => {
    const [formValue,setFormValue]=useState(initialState)
    const {loading,error}=useSelector((state)=>({...state.auth}))
    const {email,password}=formValue;
    const dispatch =useDispatch();
    const navigate=useNavigate()

    

    useEffect(() => {
     error && toast.error(error)
    }, [error])
    

    const formSubmit=(e)=>{
        e.preventDefault()
        if(email&&password){
            dispatch(login({formValue,navigate,toast}))
        }
    }
    const handliInputChange=(e)=>{
        const {name,value}=e.target;
        setFormValue({...formValue,
        [name]:value})
        console.log(formValue);

    }

    const handleCallbackResponse=(response)=>{
        try{
            console.log("Encoded JWT id token: "+JSON.stringify(response))
            var userObject=jwt_decode(response.credential)
            console.log(userObject);
            const {name,email}=userObject;
            const googleId=userObject?.sub
            console.log(name,email,googleId);
            const result={name,email,googleId}
            dispatch(googleSignIn({result,navigate,toast}))
            
        }catch(error){
            console.log(error);
        }
        
      }
      useEffect(()=>{
        //global google
        const google=window.google
        google.accounts.id.initialize({
          client_id:"552924103946-5rfu06qocmerb5cv5a3imjrm1vomsbh3.apps.googleusercontent.com",
          callback:handleCallbackResponse
        });
    
        google.accounts.id.renderButton(
          document.getElementById("singleDiv"),
          {size:"large",width: "100%" }
        )
      },[])

  return (
    <div  style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}}>
        <MDBCard style={{alignment:"center"}}>
            <MDBIcon fas icon="user-circle" className='fa-2x' />
            <h5>Sign In</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={formSubmit} noValidate className='row g-3'>
                    <div className="col-md-12">
                        <MDBInput
                        label="Email"
                        type='email'
                        value={email}
                        name='email'
                        onChange={handliInputChange}
                        invalid
                        required
                        validation="Please Provide your Email"
                        />
                    </div>
                    <div className="col-md-12">
                        <MDBInput
                        label="Password"
                        type='password'
                        value={password}
                        name='password'
                        onChange={handliInputChange}
                        invalid
                        required
                        validation="Please Provide your Password"
                        />
                    </div>
                    <div className="col-md-12">
                        <MDBBtn style={{width:"100%"}} className='mt-2'>
                            {loading&&(
                                <MDBSpinner
                                size="sm"
                                role="status"
                                tag="span"
                                className="me-2"
                                />
                            )}
                            Login
                        </MDBBtn>
                    </div>
                </MDBValidation>
                <br/>
                {/* <GoogleLogin
                clientId={client_id}
                render={(renderProps)=>(
                    <MDBBtn style={{ width: "100%" }} color="warning"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                    >
                        <MDBIcon className='me-2' fab icon="google"/>Google Sign In
                    </MDBBtn>
                  )}
                    onSuccuss={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                /> */}
                
             <div  
                 id="singleDiv"
                />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to='/register'>
                        Don,t have an account? Sign Up
                    </Link>
                </MDBCardFooter>
            
        </MDBCard>
    </div>
  )
}

export default Login