import React from "react";
import Card from "./Card.js"
import "./CardBox.css";

const CardBox = ({movieData, getNewData, filterLikeList, filterBlockList, page}) => {
    return ( 
    <div className="cardbox">
        <Card
            movieData={movieData}
            getNewData={getNewData}
            filterLikeList={filterLikeList}
            filterBlockList={filterBlockList}
            page={page}/>
    </div> );
}
 
export default CardBox;

