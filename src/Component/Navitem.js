import React from "react";

const Navitem = ({value, onClick}) => {
    return ( <div onClick={onClick}>{value}</div> );
}
 
export default Navitem;