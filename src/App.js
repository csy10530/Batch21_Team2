import React,{useState} from "react";
import "./App.css";

import Wrapper from "./Container/Wrapper";
import Nav from "./Container/Nav";
import Navitem from "./Component/Navitem";

import Page1 from "./Component/Page1";
import Page2 from "./Component/Page2";
import Body from "./Container/Body";

const navValue = ["main", "list", "like", "block"];

const App = () => {
  let [page, setPage] = useState(-1);

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
     <Body>
       {page === -1 ? (
            <Page1 />
       ):(
            <Page2 />
       )}
        
        
     </Body>

  </Wrapper> 
  
  );
}
 
export default App;