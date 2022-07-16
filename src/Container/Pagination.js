import React, {useState} from "react";
import "./Pagination.css";
import PaginationItem from "../Component/Paginationitem";

const Pagination = ({moviePage, totalPage, pageIncrement, pageDecrement}) => {

    return ( 
        <div className={"pagination"}>
            <PaginationItem
                moviePage={moviePage}
                totalPage={totalPage}
                pageIncrement={pageIncrement}
                pageDecrement={pageDecrement}
            />
        </div>
     );
}
 
export default Pagination;