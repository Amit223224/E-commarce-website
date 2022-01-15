
import './App.css';
import { BrowserRouter as Router , Routes , Route, Navigate  } from "react-router-dom";
 import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import  CartPage  from './pages/CartPage';
import  Orders  from './pages/Orders';
import  AdminPage from './pages/AdminPage';
import ProductInfo from './pages/ProductInfo';
import  LoginPage  from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './stylesheets/Layout.css';
import './stylesheets/productimg.css';
import './stylesheets/authantication.css';

function App() {
  return (
    <div className="App">
    <ToastContainer/>
    
     <Router>
     <Routes>
      <Route exact path="/" element={<ProtectedRoutes><HomePage/></ProtectedRoutes>}/>
      <Route exact path="/productinfo/:productid" element={ <ProtectedRoutes><ProductInfo/> </ProtectedRoutes>}/>
      <Route exact path="/cart" element={ <ProtectedRoutes><CartPage/> </ProtectedRoutes>}/>
      <Route exact path="/orders" element={ <ProtectedRoutes><Orders/> </ProtectedRoutes>}/>
      <Route exact path="/admin" element={ <ProtectedRoutes><AdminPage/> </ProtectedRoutes>}/>
      <Route exact path="/login" element={<LoginPage/>}/>
      <Route exact path="/register" element={<RegisterPage />}/>
     </Routes>
     </Router>
     
    </div>
  );
}

export default App;


export const ProtectedRoutes=({children})=>{
  if (localStorage.getItem('currentuser')){
    return children;
  }
  else{
    return <Navigate to='/login' />;

  }
}