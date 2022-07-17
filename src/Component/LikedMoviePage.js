import React from "react";
import CardBox from "./CardBox";


const LikedMoviePage = ({movieData, getNewData, filterLikeList, filterBlockList}) => {
    return (
        <CardBox getNewData={getNewData}
                 movieData={movieData}
                 filterLikeList={filterLikeList}
                 filterBlockList={filterBlockList}/>
    )
}

export default LikedMoviePage;