import React,{useState} from 'react'
import { Link } from "react-router-dom";
import LoaderFrist from '../components/LoaderFrist';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {  toast } from 'react-toastify';

const RegisterPage = () => {
    const[email, setEmail]=useState()
    const[password, setPassword]=useState()
    const[Cpassword, setCPassword]=useState()
    const [loading , setLoading]= useState(false)
const auth = getAuth();
const register =async()=>{
    try {
        setLoading(true);
 await createUserWithEmailAndPassword(auth, email, password)
        setLoading(false);
        toast.success('Registration Successfull')
        setEmail('');
        setPassword('');
        setCPassword('');
    } catch (error) {
        console.log(error);
        toast.error('Registration Failed')
        setLoading(false);
    }
}

    return (
        <div className= "register-parent">
        {loading && <LoaderFrist/>}
    <div className="register-top">
           </div>
        <div className="row justify-content-center">
           <div className="col-md-5">
              <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_Jejdj9.json" 
               background="transparent" 
               speed="1" 
                
                loop 
                autoplay
                ></lottie-player> 
           </div>
            <div className="col-md-4 z1">
              <div className="form-register p-5">
                <h2>Register</h2>
                   <hr/>

                <input type="text"
                 className="from-control"
                  placeholder="email"
                   value={email}
                    onChange ={(e)=>{setEmail(e.target.value)}}/>
                     <br></br>

                 <input type="password"
                  className="from-control mt-4"
                   placeholder="password"
                    value={password}
                     onChange={(e)=>{setPassword(e.target.value)}}/>
                     <br></br>
                 <input type="password"
                  className="from-control mt-4"
                   placeholder="conformPassword"
                    value={Cpassword}
                     onChange={(e)=>{setCPassword(e.target.value)}}/>
                     <br></br>
                  <button className=" btn-primary mt-4 rounded-pill" onClick={register}>REGISTER</button>
                  <hr/>
                 <p> Click Here To Login: <Link to="/login"> Login </Link></p>
              </div> 
           </div>  
        </div>
            
        </div>
    )
}

export default RegisterPage;
