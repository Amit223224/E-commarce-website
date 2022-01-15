import React from 'react'
import Header from './Header'
import LoaderFrist from './LoaderFrist';

const Layout = (props) => {
    return (
        <div>
        {props.loading && (<LoaderFrist/>)}
   <Header/>
   <div className="content">
      {props.children} 
   </div>
   
   
        </div>
    )
}

export default Layout;
