import React, {useState}  from "react";
import "./SortBtns.css";

export default function SortBtns({filteredMovies,moviePage,setSort,setFilteredMovies}){
    // 1 for true, -1 for false. Control sort order
    let [sortTitle, setSortTitle] = useState(0); 
    let [sortVoteC, setSortVoteC] = useState(0);
    let [sortVoteA, setSortVoteA] = useState(0);
    let [sortReleaseD, setSortReleaseD] = useState(0);
    

    // these funcitons are used to handle sort buttons onclick events
    function handleSortTitle() {
        setSortVoteC(0);
        setSortVoteA(0);
        setSortReleaseD(0);
        setSortTitle(sortTitle === 0 ? 1 : (sortTitle === 1 ? (sortTitle = -1, setSort(1)): (sortTitle = 1, setSort(2))));
        
        
        let sortedMovieData = filteredMovies.sort((a, b) => (sortTitle * a.title.localeCompare(b.title)));
        
        setFilteredMovies(sortedMovieData);

    }

    function handleSortVoteC() {
        setSortTitle(0);
        setSortVoteA(0);
        setSortReleaseD(0);
        setSortVoteC(sortVoteC === 0 ? 1 : (sortVoteC === 1 ? (sortVoteC = -1, setSort(3)): (sortVoteC = 1, setSort(4))));

        let sortedMovieData = filteredMovies.sort((a,b)=> (sortVoteC*(a.vote_count-b.vote_count)>0 ? 1 : -1));
        setFilteredMovies(sortedMovieData);

    }
    function  handleSortVoteA() {
        setSortTitle(0);
        setSortVoteC(0);
        setSortReleaseD(0);
        setSortVoteA(sortVoteA === 0 ? 1 : (sortVoteA=== 1 ? (sortVoteA = -1, setSort(5)): (sortVoteA = 1, setSort(6))));
        
        
        let sortedMovieData = filteredMovies.sort((a,b)=> (sortVoteA*(a.vote_average-b.vote_average)>0 ? 1 : -1));
        setFilteredMovies(sortedMovieData);

    }
    function handleSortReleaseD() {
        setSortTitle(0);
        setSortVoteC(0);
        setSortVoteA(0);
        setSortReleaseD(sortReleaseD === 0 ? 1 : (sortReleaseD === 1 ? (sortReleaseD  = -1, setSort(7)): (sortReleaseD  = 1, setSort(8))));
        
        let sortedMovieData = filteredMovies.sort((a, b) => (sortReleaseD * a.release_date.localeCompare(b.release_date)));

        setFilteredMovies(sortedMovieData);


    }
    
    return (
        <div className="sortbtns">
            <button className="btn" onClick={handleSortTitle} >
                Title
                <span className="material-symbols-outlined" style={{display: sortTitle===1? "inline" : "none"}}>arrow_upward</span>
                <span className="material-symbols-outlined" style={{display: sortTitle===-1? "inline" : "none"}}>arrow_downward</span>
            </button>
            <button className="btn" onClick={handleSortVoteC} >
                Vote Count
                <span className="material-symbols-outlined" style={{display: sortVoteC===1? "inline" : "none"}}>arrow_upward</span>
                <span className="material-symbols-outlined" style={{display: sortVoteC===-1? "inline" : "none"}}>arrow_downward</span>
            </button>
            <button className="btn" onClick={handleSortVoteA} >Vote Average
            <span className="material-symbols-outlined" style={{display: sortVoteA===1? "inline" : "none"}}>arrow_upward</span>
                <span className="material-symbols-outlined" style={{display: sortVoteA===-1? "inline" : "none"}}>arrow_downward</span>
            </button>
            <button className="btn" onClick={handleSortReleaseD} >Release Date
            <span className="material-symbols-outlined" style={{display: sortReleaseD===1? "inline" : "none"}}>arrow_upward</span>
                <span className="material-symbols-outlined" style={{display: sortReleaseD===-1? "inline" : "none"}}>arrow_downward</span>
            </button>
        </div>
    )
}