import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout'
import  fireDB from '../FirebaseConfig'
import { getDoc,doc } from "firebase/firestore";
import{useParams} from 'react-router-dom'
import {useDispatch ,useSelector} from "react-redux"; 

const ProductInfo = () => {
     const [product,setproduct]=useState();
    const {cartItems} = useSelector(state=> state.cartReducer) 
  const dispatch = useDispatch();
const params = useParams();

         useEffect(() => {
             getData();
         });

         const getData = async()=> {
                
                try {
              
             const productTemp = await getDoc(
               doc(fireDB, "products" ,params.productid )
               );
                
                
      setproduct(productTemp.data());
       
         }catch(error){
          console.log(error)
          
      } 

    };

useEffect(()=>{
localStorage.setItem('cartItems', JSON.stringify(cartItems))
},[cartItems])


    const addToCart =(product)=>{
dispatch({type:'ADD_TO_CART', payload:product})
}

    return (
        <Layout  >
        <div className="container">
           <div className="row justify-content-center">
                <div className=" col-md-8">
                  {product && (<div>
           <b><h1>{product.title}</h1></b>
             <img src={product.image} alt="" className="product-info-img"/>
             <hr/>
             <p>{product.description}</p>
             <div className="d-flex justify-content-end my-3">
               <button className="btn  rounded-pill" onClick ={()=>addToCart(product)} >Add To Cart</button>  
             </div>
         </div>)}   
        
            </div>
               
           </div>
             
        </div>
          
        </Layout>
    )
}

export default ProductInfo;
