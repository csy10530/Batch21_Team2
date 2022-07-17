import React from "react";
import CardBox from "./CardBox";


const LikedMoviePage = ({movieData, getNewData, filterLikeList, filterBlockList, page}) => {
    return (
        <CardBox getNewData={getNewData}
                 movieData={movieData}
                 filterLikeList={filterLikeList}
                 filterBlockList={filterBlockList}
                 page={page}/>
    )
}

export default LikedMoviePage;