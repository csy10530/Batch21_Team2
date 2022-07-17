import React from "react";
import "./Card.css";

const Card = ({movieData, getNewData, filterLikeList, filterBlockList, page}) => {
    const picUrl = "http://image.tmdb.org/t/p/w500/";

    const likeHandler = (eachData) =>{
        eachData.like = true;
        eachData.block = false;
        getNewData(movieData, "like");
        filterLikeList();
        filterBlockList();
    }

    const blockHandler = (eachData) =>{
        eachData.block = true;
        eachData.like = false;
        getNewData(movieData, "block");
        filterLikeList();
        filterBlockList();
    }

    return ( <>  
    {
        movieData
        .map((one, id) =>{
            return(
                <>
                <main id="main" key={id}  style={{display: page === -3 ? "flex" : (one.block ? "none" : "flex")}}>
                  <div className="movie">
                       <div className="poster">
                          <img src={picUrl + one.poster_path} alt=""/>
                          <div className="overview">
                          <p>Overview:</p>
                          <p>{one.overview}</p>
                       </div>
                  </div>
                  <div className="movie-info">
                       {
                        one.like === true ? (
                                <div className="badger">1</div>
                        ) : null      
                       }
                       <button id="like" onClick={()=>likeHandler(one)}>Like</button>
                       <button id="block" onClick={() => blockHandler(one)}>Block</button>
                       <h3>{one.title}</h3>
                       <div className="date">{one.release_date}</div>
                       <div className="other">{one.vote_count}|{one.vote_average}</div>
                  </div>
                  </div>
                </main>
                </>

            )
        })
        
    }
    
    </> );
}
 
export default Card;