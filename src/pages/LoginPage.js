
import React,{useState} from 'react'
import { Link } from "react-router-dom";
import LoaderFrist from '../components/LoaderFrist';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {  toast } from 'react-toastify';
const LoginPage = () => {
    const[email, setEmail]=useState('')
    const[password, setPassword]=useState('')
       const [loading , setLoading]= useState(false)
const auth = getAuth();

const loginPage =async()=>{
    try {
        setLoading(true);
const result = await signInWithEmailAndPassword(auth, email, password);
localStorage.setItem('currentuser', JSON.stringify(result))
  window.location.href='/'
        setLoading(false);
        toast.success('Login Successfull')
    } catch (error) {
        console.log(error);
        toast.error('Login Failed')
        setLoading(false);
    }
}

    return (
        <div className= "login-parent">
         {loading && <LoaderFrist/>}
           <div className="row justify-content-center">
           <div className="col-md-5 z1">
              <lottie-player
               src="https://assets10.lottiefiles.com/packages/lf20_uRPzul.json" 
               background="transparent" 
                speed="1" 
                loop 
               autoplay>
               </lottie-player> 
           </div>
            <div className="col-md-4 z1">
              <div className="form-login p-5">
                <h2>Login</h2>
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
                
                    
                  <button className=" btn-primary mt-4 rounded-pill  " onClick={loginPage}>Login</button>
                  <hr/>
                <p> Click Here To Register: <Link to="/register"> Register </Link></p>
              </div> 
           </div>  
        </div>
    
     <div className="login-bottom">
           </div>
            
        </div>
    )
}

export default LoginPage;
