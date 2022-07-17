import React, {useEffect, useState, useCallback} from "react";
import "./App.css";

import Wrapper from "./Container/Wrapper";
import Nav from "./Container/Nav";
import Navitem from "./Component/Navitem";

import HomePage from "./Component/HomePage";
import CardBox from "./Component/CardBox";
import Body from "./Container/Body";

import {fetchData } from "./Component/FetchData";
import SortBtns from "./Component/SortBtns"


import Caption from "./Component/Caption";

import Pagination from "./Container/Pagination";
import LikedMoviePage from "./Component/LikedMoviePage";
import BlockedMoviePage from "./Component/BlockedMoviePage";

const navValue = ["Home Page", "Movie List", "My Like", "My Block"];

const App = () => {
    let [page, setPage] = useState(1);

    let [moviePage, setMoviePage] = useState(1);
    let [storedMovieData, setStoredMovieData] = useState([]);
    // // store fetched data to movieData. Each time data fetched, one more object in movieData
    let [movieData, setMovieData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [likedMovies, setLikedMovies] = useState([]);
    const [blockedMovies, setBlockedMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);


    const getNewData = (newData, flag) =>{
        if (flag === "like") {
            setLikedMovies(newData);
        } else if (flag === "block") {
            setBlockedMovies(newData);
        }

        const newList = [];
        for (let i = 0; i < storedMovieData.length; i++) {
            storedMovieData[i].results.forEach(data => newList.push(data));
        }

        setFilteredMovies(newList.filter(data => !data.block));
    }

    const getSortedData = (sortedData) =>{
        setMovieData(sortedData);
    }

    useEffect(() => {
        if (moviePage <= storedMovieData.length) {
            setMovieData(storedMovieData[moviePage - 1].results);
            setFilteredMovies(storedMovieData[moviePage - 1].results);
        } else {
            fetchData(moviePage)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                data.results.forEach(item => {
                    item.like = false;
                    item.block = false;
                    return item;
                })
                setStoredMovieData(storedMovieData.concat(data));
                setFilteredMovies(data.results);
                setMovieData(data.results)
                setTotalPages(data.total_pages)
            })
        } 
    }, [moviePage]);

    const navHandler = (e) => {
        let value = e.target.innerHTML;
        if (value === "Home Page") {
            setPage(-1);
        } else if (value === "Movie List") {
            setPage(1);
        } else if (value === "My Like") {
            setPage(-2);
        } else if (value === "My Block") {
            setPage(-3);
        }
    }

    const handlePageNumIncrement = () => {
        setMoviePage(moviePage + 1);
    }

    const handlePageNumDecrement = () => {
        if (moviePage === 1) {
            return;
        }
        setMoviePage(moviePage - 1);
    }

    const filterLikeList = () => {
        setLikedMovies(movieData.filter(movie => movie.like));
    }

    const filterBlockList = () => {
        setBlockedMovies(movieData.filter(movie => movie.block));
    }

    return (
        <Wrapper>
            <Caption value={"Movie View"}/>
            <Nav>
                {
                    navValue.map((nav) => {
                        return (
                            <Navitem value={nav} onClick={(e) => navHandler(e)}/>
                        )
                    })
                }
            </Nav>
            
            <Pagination moviePage={moviePage}
                        totalPage={totalPages}
                        pageIncrement={handlePageNumIncrement}
                        pageDecrement={handlePageNumDecrement}/>

            <SortBtns movieData={movieData} getSortedData={getSortedData}/>



            <Body>
                {page === -1 ? <HomePage/> :
                    (page === -2 ? <LikedMoviePage
                            movieData={likedMovies}
                            getNewData={getNewData}
                            filterLikeList={filterLikeList}
                            filterBlockList={filterBlockList}
                            page={page}/> :
                        (page === -3 ? <BlockedMoviePage
                                movieData={blockedMovies}
                                getNewData={getNewData}
                                filterLikeList={filterLikeList}
                                filterBlockList={filterBlockList}
                                page={page}/> :
                            <CardBox
                                movieData={filteredMovies}
                                getNewData={getNewData}
                                filterLikeList={filterLikeList}
                                filterBlockList={filterBlockList}
                                page={page}/>))}

            </Body>
        </Wrapper>
    );
}

export default App;