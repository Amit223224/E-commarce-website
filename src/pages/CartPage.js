import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import {useSelector,useDispatch} from 'react-redux'
import { FaTrash } from "react-icons/fa";
import {Modal} from 'react-bootstrap'
import { addDoc, collection } from 'firebase/firestore'
import  fireDB from '../FirebaseConfig'
import {  toast } from 'react-toastify';

const CartPage = () => {
    const {cartItems} = useSelector(state=> state.cartReducer)
    const[totalAmount , setTotalAmount]=useState(0);
 const dispatch = useDispatch();

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[Name, setName]=useState()
    const[Address, setAddress]=useState()
    const[PhoneNumber, setPhoneNumber]=useState()
const[PinCode, setPinCode]=useState()

 const [loading , setLoading]= useState(false)



useEffect(() => {
    let temp=0;
    cartItems.forEach((cartItem) => {
        temp=temp+cartItem.price
    })
    setTotalAmount(temp)
}, [cartItems]);


    const DeleteFromCart =(product)=>{
dispatch({type:'DELETE_FROM_CART', payload:product});
};

const PlaceOrder =async()=>{
    const address ={
     Name ,
     Address,
     PhoneNumber,
     PinCode
    }
    console.log(address);
    const orderinfo ={
        cartItems,
        address,
        email : JSON.parse(localStorage.getItem("currentuser")).user.email ,
        userid : JSON.parse(localStorage.getItem("currentuser")).user.uid,
    }
try {
    setLoading(true)
     await addDoc(collection(fireDB, "orders"), orderinfo)
    setLoading(false)
    toast.success('Order Successful')
    handleClose(); 
} catch (error) {
    setLoading(false)
    toast.error('Oreder Failed')
}

};


    return (
        <Layout loading={loading}>
         <table className="table mt-3">
             <thead>
                 <tr>
                     <th>Image</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Action</th>
                 </tr>
             </thead>
             <tbody>
                 {cartItems.map(item=>{
                 return  <tr>
                     <td><img src={item.image} alt="" height="80"  width="80"/></td>
                     <td>{item.title}</td>
                     <td>$ {item.price}</td>
                     <td><FaTrash onClick={()=>DeleteFromCart(item)}/></td>

                 </tr>
                
                 })}
             </tbody>
         </table>
         
         <div className=" d-flex justify-content-end mx-3 ">

            <h3 className="total-amount p-2 rounded-pill">Total Amount = {totalAmount}$</h3> 
         </div>
         <div className=" d-flex justify-content-end mx-4 mt-4 ">

            <button className="total-amount p-3 rounded-pill" onClick ={ handleShow } >Place Order</button> 
         </div>

          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <div className="form-register p-5">
                <h2>User Details</h2>
                   <hr/>

                <input type="text"
                 className="from-control"
                  placeholder="name"
                  name=""
                   value={Name}
                    onChange ={(e)=>{setName(e.target.value)}}/>
                     <br></br>

                 <input type="address"
                  className="from-control mt-4"
                   placeholder="Address"
                   name=""
                    value={Address}
                     onChange={(e)=>{setAddress(e.target.value)}}/>
                     <br></br>
                 <input type="text"
                  className="from-control mt-4"
                   placeholder="PhoneNumber"
                   name=""
                    value={PhoneNumber}
                     onChange={(e)=>{setPhoneNumber(e.target.value)}}/>
                     <br></br>
                      <input type="text"
                  className="from-control mt-4"
                  name=""
                   placeholder="PinCode"
                    value={PinCode}
                     onChange={(e)=>{setPinCode(e.target.value)}}/>

                
              </div>
              
               </Modal.Body>
        <Modal.Footer>
          <button className="btn rounded-pill" onClick={handleClose}>
            Close
          </button>
          <button  className="btn " onClick={PlaceOrder}>
            ORDER
          </button>
        </Modal.Footer>
      </Modal>   
        </Layout>
    )
}

export default CartPage;
