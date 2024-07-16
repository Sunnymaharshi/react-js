import {LOGO_URL} from "../utils/constant";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {

    const [btnName,setBtnName] = useState("Login");
    const toggleLogin = ()=>{
        btnName==="Login" ? setBtnName("Logout") : setBtnName("Login");
    }

    useEffect(()=>{
        console.log("Header useEffect called");
    },[btnName])
    return (
      <div className="header flex justify-between items-center bg-pink-100 shadow-sm mb-2">
        <div className="logo-container">
          <img className="w-30 h-24" src={LOGO_URL} />
        </div>
        <div className="nav-items">
          <ul className="flex">
            <li className="px-5"><Link to='/'>Home</Link></li>
            <li className="px-5"><Link to='/grocery'>Grocery</Link></li>
            <li className="px-5"><Link to='/about'>About Us</Link></li>
            <li className="px-5"><Link to='/contact'>Contact Us</Link></li>
            <li className="px-5"><Link to='/'></Link>Cart</li>
            <button className="login-btn" onClick={toggleLogin}>{btnName}</button>
          </ul>
        </div>
      </div>
    );
};

export default Header;