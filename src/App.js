import React, {useEffect, useState} from "react";
import "./App.css";

import Wrapper from "./Container/Wrapper";
import Nav from "./Container/Nav";
import Navitem from "./Component/Navitem";

import HomePage from "./Component/HomePage";
import Page2 from "./Component/Page2";
import Body from "./Container/Body";
import {fetchData} from "./Component/FetchData";
import Pagination from "./Container/Pagination";
import LikedMoviePage from "./Component/LikedMoviePage";
import BlockedMoviePage from "./Component/BlockedMoviePage";

const navValue = ["main", "list", "like", "block"];

const App = () => {
    let [page, setPage] = useState(1);

    let [moviePage, setMoviePage] = useState(1);
    // store fetched data to movieData. Each time data fetched, one more object in movieData
    let [movieData, setMovieData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [likedMovies, setLikedMovies] = useState([]);
    const [blockedMovies, setBlockedMovies] = useState([]);

    useEffect(() => {
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
                setMovieData(movieData.concat(data));
                setTotalPages(data.total_pages);
            })
    }, [moviePage]);

    const navHandler = (e) => {
        let value = e.target.innerHTML;
        if (value === "main") {
            setPage(-1);
        } else if (value === "list") {
            setPage(1);
        } else if (value === "like") {
            setPage(-2);
        } else if (value === "block") {
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

            <Body>
                {page === -1 ? <HomePage/> :
                    (page === -2 ? <LikedMoviePage likedMovies={likedMovies}/> :
                        (page === -3 ? <BlockedMoviePage blockedMovies={blockedMovies}/> : <Page2/>))}
            </Body>

        </Wrapper>
    );
}

export default App;