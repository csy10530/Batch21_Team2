import React,{useState} from "react";
import "./App.css";

import Wrapper from "./Container/Wrapper";
import Nav from "./Container/Nav";
import Navitem from "./Component/Navitem";

import HomePage from "./Component/HomePage";
import Page2 from "./Component/Page2";
import Body from "./Container/Body";
import FetchData from "./Component/FetchData"

const navValue = ["main", "list", "like", "block"];

const App = () => {
  let [page, setPage] = useState(1);

  // store feched data to movieData. Each time data fetched, one more object in movieData
  let [movieData, setmovieData] = useState([]);
  let storeFetchedData = function(data){
    setmovieData(movieData.concat(data));
    // console.log(movieData)
  }

  const navHandler = (e) =>{
     let value = e.target.innerHTML;
     if (value === "main"){
       setPage(-1);
     }else{
       setPage(1);
     }
  }//123
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
     <Body>
       {page === -1 ? (
            <HomePage />
       ):(
          // <Page2 />
          <FetchData pageNumber={page} storeFetchedData={storeFetchedData} />
       )}
        
        
     </Body>

  </Wrapper> 
  
  );
}
 
export default App;