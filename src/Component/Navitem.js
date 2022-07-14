import React from "react";
import "./Navitem.css";

const Navitem = ({value, onClick}) => {
    return ( <div className="navitem" onClick={onClick}>{value}</div> );
}
 
export default Navitem;