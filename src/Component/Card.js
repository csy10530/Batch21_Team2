import React from "react";
import "./Card.css";

const Card = ({movieData, getNewData}) => {
    const picUrl = "http://image.tmdb.org/t/p/w500/";

    const likeHandler = (eachData) =>{
        eachData.like = !eachData.like;
        getNewData(movieData);
    }

    const blockHandler = (eachData) =>{
        eachData.block = !eachData.block;
        getNewData(movieData);
    }

    return ( <>  
    {
        movieData
        .map((one, id) =>{
            return(
                <>
                <main id="main" key={id}>
                  <div className="movie">
                       <div className="poster">
                          <img src={picUrl + one.poster_path} alt=""/>
                          <div class="overview">
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