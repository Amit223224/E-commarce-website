import React,{useState,useEffect} from 'react'
import  fireDB from '../FirebaseConfig'
import { collection, getDocs } from "firebase/firestore";
import Layout from '../components/Layout'

const Orders = () => {
     const [Orders,setorder]=useState([]);
         const[loading,setLoading]=useState(false)
         
const userId =JSON.parse(localStorage.getItem('currentuser')).user.uid
         
          useEffect(() => {
             getData();
         }, [])                    

            const getData = async()=> {
               setLoading(true);
                try {
                   
             const result = await getDocs(collection(fireDB, "orders"))
                const orderArray =[];
                 result.forEach((doc) => {
 
                  
                orderArray.push(doc.data());
                setLoading(false);
                       });
      setorder(orderArray);
         }
      catch(error){
          console.log(error);
          setLoading(false)
      } 

    };

     
    return (<Layout loading={loading}>
        <div className="order">
          {Orders.filter(obj=>obj.userId === userId).map((order )=>{
              return <table className="table mt-3">
             <thead className="border">
                 <tr >
                     <th>Image</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Action</th>
                 </tr>
             </thead>
             <tbody>
                 {order.cartItems.map(item=> {
                 return  <tr >
                     <td><img src={item.image} alt="" height="80"  width="80"/></td>
                     <td>{item.title}</td>
                     <td>$ {item.price}</td>
                     

                 </tr>
                
                 })}
             </tbody>
         </table>
    
          })}  
        </div>
        </Layout>
    )
}

export default Orders;
