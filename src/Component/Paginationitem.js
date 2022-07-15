import React from "react";

const PaginationItem = ({page, totalPage, pageIncrement, pageDecrement}) => {
    return (
        <div className={"pagination-item"}>
            <button
                className={"prev-button material-symbols-outlined"}
                onClick={pageDecrement}
                disabled={page === 1}
            >
                chevron_left
            </button>

            <div className={"page-info"}>{`${page} / ${totalPage}`}</div>

            <button
                className={"next-button material-symbols-outlined"}
                onClick={pageIncrement}
            >
                chevron_right
            </button>
        </div>
    );
}

export default PaginationItem