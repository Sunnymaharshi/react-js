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
      <div className="header">
        <div className="logo-container">
          <img src={LOGO_URL} />
        </div>
        <div className="nav-items">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/grocery'>Grocery</Link></li>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
            <li><Link to='/'></Link>Cart</li>
            <button className="login-btn" onClick={toggleLogin}>{btnName}</button>
          </ul>
        </div>
      </div>
    );
};

export default Header;