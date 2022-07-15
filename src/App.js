import React,{useEffect, useState} from "react";
import "./App.css";

import Wrapper from "./Container/Wrapper";
import Nav from "./Container/Nav";
import Navitem from "./Component/Navitem";

import HomePage from "./Component/HomePage";
import Page2 from "./Component/Page2";
import Body from "./Container/Body";
import {fetchData} from "./Component/fetchData"
import Pagination from "./Container/Pagination";

const navValue = ["main", "list", "like", "block"];

const App = () => {
  let [page, setPage] = useState(1);

  let [moviePage, setMoviePage] = useState(1);
  // store feched data to movieData. Each time data fetched, one more object in movieData
  let [movieData, setMovieData] = useState([]);
  useEffect(()=>{
    fetchData(moviePage)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMovieData(movieData.concat(data));
        console.log(data);
        console.log(moviePage);
      })
  },[moviePage])

  const navHandler = (e) =>{
     let value = e.target.innerHTML;
     if (value === "main"){
       setPage(-1);
     }else{
       setPage(1);
     }
  }
  return ( 
  <Wrapper>
     <Nav>
       {
         navValue.map((nav) =>{
           return(
             <Navitem value ={nav} onClick={(e) => navHandler(e)}/>
           )
         })
       }
     </Nav>
     {/* this is to test data change with page number */}
     <input type="number" onChange = {(e)=>setMoviePage(e.target.value)}></input>
     
     <Pagination page={moviePage} />
     
     <Body>
       {page === -1 ? (
            <HomePage />
       ):(
           <>
               <Page2 />
           </>

       )}
        
        
     </Body>

  </Wrapper> 
  
  );
}
 
export default App;