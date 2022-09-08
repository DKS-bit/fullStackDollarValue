import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Container } from "./Pagination.style";
interface paginationDetails {
    count: number,
    elementsPerPage: number,
    setOffset: React.Dispatch<React.SetStateAction<number>>

}

function Pagination(props: paginationDetails) {

    const handlePageClick = (e: any) => {
        let controlOffset = e.selected * props.elementsPerPage;
        props.setOffset(controlOffset);

    }


    return (
        <Container>
            {/* <PaginationWrapper> */}
            <ReactPaginate
                breakLabel=".."
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={Math.ceil(props.count / props.elementsPerPage)}
                previousLabel="< "

            />
            {/* </PaginationWrapper> */}
        </Container>
    );
}

export default Pagination;