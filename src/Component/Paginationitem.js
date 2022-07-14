const PaginationItem = ({pageNum, handlePageNumIncrement, handlePageNumDecrement}) => {
    return (
        <div className={"pagination-item"}>
            <button
                className={"prev-button material-symbols-outlined"}
                onClick={handlePageNumDecrement}
                disabled={pageNum === 1}
            >
                chevron_left
            </button>

            <div className={"page-info"}>{`${pageNum}`}</div>

            <button
                className={"next-button material-symbols-outlined"}
                onClick={handlePageNumIncrement}
            >
                chevron_right
            </button>
        </div>
    );
}

export default PaginationItem