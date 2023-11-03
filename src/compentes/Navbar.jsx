import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <>
 <nav className="d-flex  flex-row align-items-center p-3 
    px-4 mb-3 bg-dark text-white ">
  
  <Link  style={{"textDecoration":"none"}} to="/" className="p-2  text-white h4">MovieDp App</Link>     
  
  <Link style={{"textDecoration":"none"}}    to="Trending" className="p-2 text-white h4 ">Trending</Link> 
    
      <form className="d-flex ms-auto mr-5"  role="search">
        <input className="form-control me-2" type="search" placeholder="Movies Search" aria-label="Search" />
        <button className="btn btn-outline-secondary" type="submit">Search</button>
      </form>
   
  
</nav>
 
   
    </>
  )
}

export default Navbar