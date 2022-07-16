import React from "react";
import Card from "./Card.js"
import "./CardBox.css";

const CardBox = ({movieData, getNewData}) => {
    return ( 
    <div className="cardbox">
        <Card movieData={movieData} getNewData={getNewData}></Card>
    </div> );
}
 
export default CardBox;

