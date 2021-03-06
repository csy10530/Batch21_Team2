import React, {useEffect, useState} from "react";
import "./App.css";

import Wrapper from "./Container/Wrapper";
import Nav from "./Container/Nav";
import Navitem from "./Component/Navitem";

import HomePage from "./Component/HomePage";
import CardBox from "./Component/CardBox";
import Body from "./Container/Body";

import {fetchData} from "./Component/FetchData";
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
    const [totalPages, setTotalPages] = useState(0);

    const [likedMovies, setLikedMovies] = useState([]);
    const [blockedMovies, setBlockedMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);


    const getNewData = (eachData, flag) => {
        // update clicked data in our stored movie data
        storedMovieData[eachData.page - 1].results = storedMovieData[eachData.page - 1].results.filter((data) => {
            if (data.id === eachData.id) {
                return eachData
            } else {
                return data
            }
        });
        // Update liked or blocked movie list based on flag type
        if (flag === "like") {
            setLikedMovies(likedMovies.concat(eachData));
            // Update clicked like movie in blocked list
            let likeItemInBlocked = blockedMovies.filter((data) => {
                if (data.id !== eachData.id) {
                    return data
                }
            })
            setBlockedMovies(likeItemInBlocked);
        } else if (flag === "block") {
            setBlockedMovies(blockedMovies.concat(eachData));
            setFilteredMovies(filteredMovies.concat(eachData));
            // update cliked block movie in liked list
            let blockItemInLiked = likedMovies.filter((data) => {
                if (data.id !== eachData.id) {
                    return data
                }
            })
            setLikedMovies(blockItemInLiked);
        }
    }


    let [sort, setSort] = useState(-1);
    useEffect(() => {
        if (moviePage <= storedMovieData.length) {
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
                        item.page = moviePage;
                        return item;

                    })
                    setStoredMovieData(storedMovieData.concat(data));
                    setFilteredMovies(data.results);
                    setTotalPages(data.total_pages);
                })
        }
    }, [moviePage, sort]);

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


            {
                page === 1 ? (
                    <>
                        <Pagination moviePage={moviePage}
                                    totalPage={totalPages}
                                    pageIncrement={handlePageNumIncrement}
                                    pageDecrement={handlePageNumDecrement}/>
                        <SortBtns setSort={setSort} filteredMovies={filteredMovies} moviePage={moviePage}
                                  setFilteredMovies={setFilteredMovies}/>
                    </>

                ) : null
            }

            <Body>
                {page === -1 ? <HomePage/> :
                    (page === -2 ? <LikedMoviePage
                            movieData={likedMovies}
                            getNewData={getNewData}
                            page={page}/> :
                        (page === -3 ? <BlockedMoviePage
                                movieData={blockedMovies}
                                getNewData={getNewData}
                                page={page}/> :
                            <CardBox
                                movieData={filteredMovies}
                                getNewData={getNewData}
                                page={page}/>))}

            </Body>
        </Wrapper>
    );
}

export default App;