import React, {useState} from "react";
import "./Pagination.css";
import PaginationItem from "../Component/Paginationitem";

const Pagination = ({children}) => {
    const [pageNum, setPageNum] = useState(1);

    const handlePageNumIncrement = () => {
        setPageNum(pageNum + 1);
    }

    const handlePageNumDecrement = () => {
        if (pageNum === 1) {
            return;
        }
        setPageNum(pageNum - 1);
    }

    return ( 
        <div className={"pagination"}>
            <PaginationItem
                pageNum={pageNum}
                handlePageNumIncrement={handlePageNumIncrement}
                handlePageNumDecrement={handlePageNumDecrement}
            />
        </div>
     );
}
 
export default Pagination;