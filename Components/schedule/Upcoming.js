import React, { useState, useEffect } from "react";
import DiscoverCard from "./ScheduleCard";
import axios from "../../services/axios";
import {  RAPIDAPI_HOST, RAPIDAPI_KEY } from "../../services/Parties";
import ReactPaginate from "react-paginate";

export default function Upcoming() {
  const [upcoming, setUpComing] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    axios
      .get(`https://streaming-availability.p.rapidapi.com/search/basic`, {
        params: {
          country: "us",
          service: "netflix",
          type: "movie",
          language: "en",
          page: page,
        },
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
        },
      })
      .then((response) => {
        setTotalPage(response.data.total_pages);
        setUpComing(response.data.results);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, setPage]);

  const onPageChange = (res) => {
    setPage(res.selected + 1);
  };

  return (
    <div className={""}>
      <div className={"mb-10"}>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={totalPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          onPageChange={onPageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
      {upcoming.map((e, i) => (
        <DiscoverCard key={i} data={e} ongoing={false} />
      ))}
      <div className={"mb-10"}>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={totalPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          onPageChange={onPageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
