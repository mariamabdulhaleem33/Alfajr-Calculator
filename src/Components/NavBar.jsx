import React from "react";
import logo from "../images/Untitled-1-Recovered-Recovered-Recovered copy.png";
import calc from "../images/calculator.png";
import price from "../images/dollar.png";
import { useState } from "react";
import { Link } from "react-router-dom";
 
const NavBar = (props) => {
    // console.log(typeof (props.Ref));
    const [activeTab, setActiveTab] = useState(props.Ref);

    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }
    return (
        <div className="navbar">
            <img src={logo} alt="logo" className="logo"/>
            <div className="tabs">
                <ul className="tab-links">
                    <Link style={{textDecoration:"none"}} to="/">
                        <li className={activeTab === "calculator" ? "active tab calculator" : "tab calculator"} onClick={() => handleActiveTab("calculator")}>
                            <img src={calc} className="primary" alt="calc"/>
                            <h5>الحاسبة</h5>
                        </li>
                    </Link>
                    <Link style={{textDecoration:"none"}} to="/price">
                        <li className={activeTab === "price" ? "active tab price" : "tab price"}  onClick={() => handleActiveTab("price")}>
                            <img src={price} className="primary" alt="price"/>
                            <h5>أسعار الطباعة</h5>
                        </li>
                    </Link>
                </ul>
            </div>
            <h5>By <a style={{textDecoration:"none"}} href="https://www.linkedin.com/in/mariam-abdulhaleem-ba2791203?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Mariam Abdulhaleem</a></h5>
        </div>
    );
};
export default NavBar;