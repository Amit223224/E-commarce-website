import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import  fireDB from '../FirebaseConfig'
import { collection, getDocs } from "firebase/firestore"; 
//import {fireproducts  } from '../firecommarce-product';
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import {useDispatch} from "react-redux";



       const HomePage = () => {

         const [products,setproducts]=useState([]);
         const[loading,setLoading]=useState(false);
      
         const {cartItems} = useSelector(state=> state.cartReducer)
         const dispatch = useDispatch();
        const navigate = useNavigate();

         useEffect(() => {
             getData();
         }, [])                    

            const getData = async()=> {
               setLoading(true);
                try {
                   
             const users = await getDocs(collection(fireDB, "products"))
                const productArray =[];
                 users.forEach((doc) => {
 
                  const obj ={
                       id:doc.id,
                       ...doc.data()
                           }
                productArray.push(obj);
                setLoading(false);
                       });
      setproducts(productArray);
         }
      catch(error){
          console.log(error);
          setLoading(false)
      } 

    };
    //this is add to cart functionality
useEffect(()=>{
localStorage.setItem('cartItems', JSON.stringify(cartItems))
},[cartItems])

const addToCart =(product)=>{
dispatch({type:'ADD_TO_CART', payload:product})
}
 
    return (
        <Layout loading={loading}>
        
        
        <div className="container">
       
          <div className="row">
             {products.map((product ,i)=>{

              return <div className="col-md-4" key={i}>
              <div className="m-2 p-1 product position-relative ">
               <div className="product-content">
                  <p>{product.title}</p>
              <div className="text-center">
                <img src={product.image} alt="" className="product-img"/> 
              </div>
               </div>
               <div className="product-actions">
                <h2>$:{product.price}</h2> 
                <div className="d-flex">
                  <button className="btn mx-2 rounded-pill" onClick={()=>addToCart(product)} >Add To Cart</button>
                  <button  className="btn rounded-pill" onClick={()=>{
                    navigate(`/productinfo/${product.id}`)
                  }}>View</button>
                </div>
               </div>
              </div>
              </div>
             })} 
          </div>
            
        </div>
         
       
        </Layout>
    )
}

export default HomePage;
