import React, {useEffect, useState} from "react";
import "./App.css";

import Wrapper from "./Container/Wrapper";
import Nav from "./Container/Nav";
import Navitem from "./Component/Navitem";

import HomePage from "./Component/HomePage";
import CardBox from "./Component/CardBox";
import Body from "./Container/Body";

import Caption from "./Component/Caption";
import {fetchData} from "./Component/FetchData"

import Pagination from "./Container/Pagination";

const navValue = ["main", "list", "like", "block"];

const App = () => {
    let [page, setPage] = useState(1);

    let [moviePage, setMoviePage] = useState(1);
    // store fetched data to movieData. Each time data fetched, one more object in movieData
    let [movieData, setMovieData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const getNewData = (newData) =>{
        setMovieData(newData);
    }

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
                setMovieData(movieData.concat(data.results));
                setTotalPages(data.total_pages);
                console.log(movieData);
            })
    }, [moviePage, movieData])


    const navHandler = (e) => {
        let value = e.target.innerHTML;
        if (value === "main") {
            setPage(-1);
        } else {
            setPage(1);
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
            <Caption value={"This is our top movie list"}/>
            <Nav>
                {
                    navValue.map((nav) => {
                        return (
                            <Navitem value={nav} onClick={(e) => navHandler(e)}/>
                        )
                    })
                }
            </Nav>

            <Pagination page={moviePage} totalPage={totalPages} pageIncrement={handlePageNumIncrement}
                        pageDecrement={handlePageNumDecrement}/>

            <Body>
                {page === -1 ? (
                    <HomePage/>
                ) : (
                    <>
                        <CardBox movieData={movieData} getNewData={getNewData}/>
                    </>

                )}
            </Body>

        </Wrapper>

    );
}

export default App;