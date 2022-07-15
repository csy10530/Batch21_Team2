import React, {useState} from "react";
import "./Pagination.css";
import PaginationItem from "../Component/Paginationitem";

const Pagination = ({page, totalPage, pageIncrement, pageDecrement}) => {

    return ( 
        <div className={"pagination"}>
            <PaginationItem
                page={page}
                totalPage={totalPage}
                pageIncrement={pageIncrement}
                pageDecrement={pageDecrement}
            />
        </div>
     );
}
 
export default Pagination;